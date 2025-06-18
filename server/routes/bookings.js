import express from 'express';
import Booking from '../models/booking.js';
import Lodging from '../models/lodging.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Create a new booking (protected route)
router.post('/', verifyToken, async (req, res) => {
    try {
        const {
            lodging,
            checkIn,
            checkOut,
            guests,
            specialRequests
        } = req.body;

        // Basic validation
        if (!lodging || !checkIn || !checkOut || !guests) {
            return res.status(400).json({
                message: 'Lodging, check-in date, check-out date, and number of guests are required'
            });
        }

        // Validate dates
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkInDate < today) {
            return res.status(400).json({
                message: 'Check-in date cannot be in the past'
            });
        }

        if (checkOutDate <= checkInDate) {
            return res.status(400).json({
                message: 'Check-out date must be after check-in date'
            });
        }

        // Validate guests
        if (guests < 1) {
            return res.status(400).json({
                message: 'Number of guests must be at least 1'
            });
        }

        // Check if lodging exists and is available
        const lodgingDetails = await Lodging.findById(lodging);
        if (!lodgingDetails) {
            return res.status(404).json({
                message: 'Lodging not found'
            });
        }

        if (!lodgingDetails.available) {
            return res.status(400).json({
                message: 'Lodging is not available for booking'
            });
        }

        // Check if guests exceed maximum capacity
        if (guests > lodgingDetails.maxGuests) {
            return res.status(400).json({
                message: `Number of guests cannot exceed ${lodgingDetails.maxGuests}`
            });
        }

        // Check for conflicting bookings
        const conflictingBookings = await Booking.find({
            lodging: lodging,
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                {
                    checkIn: { $lt: checkOutDate },
                    checkOut: { $gt: checkInDate }
                }
            ]
        });

        if (conflictingBookings.length > 0) {
            return res.status(400).json({
                message: 'Lodging is not available for the selected dates'
            });
        }

        // Calculate total price (simple calculation: days * price per night)
        const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const totalPrice = days * lodgingDetails.price;

        // Create new booking
        const booking = new Booking({
            lodging,
            guest: req.user.userId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests,
            totalPrice,
            specialRequests: specialRequests || ''
        });

        await booking.save();

        // Populate the booking details
        const populatedBooking = await Booking.findById(booking._id)
            .populate('lodging', 'title location price')
            .populate('guest', 'name email');

        res.status(201).json({
            message: 'Booking created successfully',
            booking: populatedBooking
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating booking',
            error: error.message
        });
    }
});

// Get all bookings for a user (protected route)
router.get('/my-bookings', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ guest: req.user.userId })
            .populate('lodging', 'title location price images')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Bookings retrieved successfully',
            bookings
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bookings',
            error: error.message
        });
    }
});

// Get bookings for host's lodgings (protected route)
router.get('/host-bookings', verifyToken, async (req, res) => {
    try {
        // First get all lodgings owned by the host
        const hostLodgings = await Lodging.find({ host: req.user.userId });
        const lodgingIds = hostLodgings.map(lodging => lodging._id);

        // Then get all bookings for those lodgings
        const bookings = await Booking.find({ lodging: { $in: lodgingIds } })
            .populate('lodging', 'title location price')
            .populate('guest', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Host bookings retrieved successfully',
            bookings
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving host bookings',
            error: error.message
        });
    }
});

// Get booking by ID (protected route)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('lodging', 'title location price images host')
            .populate('guest', 'name email');

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        // Check if user is either the guest or the host
        const isGuest = booking.guest._id.toString() === req.user.userId;
        const isHost = booking.lodging.host.toString() === req.user.userId;

        if (!isGuest && !isHost) {
            return res.status(403).json({
                message: 'You can only view your own bookings'
            });
        }

        res.status(200).json({
            message: 'Booking retrieved successfully',
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving booking',
            error: error.message
        });
    }
});

// Update booking status (protected route - only host can update)
router.put('/:id/status', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
            return res.status(400).json({
                message: 'Valid status is required (pending, confirmed, cancelled, completed)'
            });
        }

        const booking = await Booking.findById(req.params.id)
            .populate('lodging', 'host');

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        // Check if user is the host
        if (booking.lodging.host.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'Only the host can update booking status'
            });
        }

        booking.status = status;
        await booking.save();

        const updatedBooking = await Booking.findById(booking._id)
            .populate('lodging', 'title location price')
            .populate('guest', 'name email');

        res.status(200).json({
            message: 'Booking status updated successfully',
            booking: updatedBooking
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating booking status',
            error: error.message
        });
    }
});

// Cancel booking (protected route - guest can cancel their own booking)
router.put('/:id/cancel', verifyToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        // Check if user is the guest
        if (booking.guest.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You can only cancel your own bookings'
            });
        }

        // Check if booking can be cancelled
        if (booking.status === 'cancelled' || booking.status === 'completed') {
            return res.status(400).json({
                message: 'Cannot cancel a booking that is already cancelled or completed'
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        const updatedBooking = await Booking.findById(booking._id)
            .populate('lodging', 'title location price')
            .populate('guest', 'name email');

        res.status(200).json({
            message: 'Booking cancelled successfully',
            booking: updatedBooking
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error cancelling booking',
            error: error.message
        });
    }
});

export default router;