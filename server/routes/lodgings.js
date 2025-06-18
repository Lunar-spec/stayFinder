import express from 'express';
import Lodging from '../models/lodging.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Create a new lodging (protected route)
router.post('/', verifyToken, async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            price,
            maxGuests,
            bedrooms,
            bathrooms,
            images,
            amenities
        } = req.body;

        // Basic validation
        if (!title || !description || !location || !price || !maxGuests || !bedrooms || !bathrooms) {
            return res.status(400).json({
                message: 'Title, description, location, price, maxGuests, bedrooms, and bathrooms are required'
            });
        }

        // Validate location object
        if (!location.address || !location.city || !location.state || !location.country) {
            return res.status(400).json({
                message: 'Complete location details (address, city, state, country) are required'
            });
        }

        // Validate numeric fields
        if (price < 0 || maxGuests < 1 || bedrooms < 1 || bathrooms < 1) {
            return res.status(400).json({
                message: 'Price must be non-negative, maxGuests, bedrooms, and bathrooms must be at least 1'
            });
        }

        // Create new lodging
        const lodging = new Lodging({
            title,
            description,
            location,
            price,
            maxGuests,
            bedrooms,
            bathrooms,
            images: images || [],
            amenities: amenities || [],
            host: req.user.userId
        });

        await lodging.save();

        res.status(201).json({
            message: 'Lodging created successfully',
            lodging
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating lodging',
            error: error.message
        });
    }
});

// Get all lodgings
router.get('/', async (req, res) => {
    try {
        const lodgings = await Lodging.find({ available: true })
            .populate('host', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Lodgings retrieved successfully',
            lodgings
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving lodgings',
            error: error.message
        });
    }
});

// Get lodging by ID
router.get('/:id', async (req, res) => {
    try {
        const lodging = await Lodging.findById(req.params.id)
            .populate('host', 'name email');

        if (!lodging) {
            return res.status(404).json({
                message: 'Lodging not found'
            });
        }

        res.status(200).json({
            message: 'Lodging retrieved successfully',
            lodging
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving lodging',
            error: error.message
        });
    }
});

// Get lodgings by host (protected route)
router.get('/host/my-lodgings', verifyToken, async (req, res) => {
    try {
        const lodgings = await Lodging.find({ host: req.user.userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Host lodgings retrieved successfully',
            lodgings
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving host lodgings',
            error: error.message
        });
    }
});

// Update lodging (protected route - only host can update)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const lodging = await Lodging.findById(req.params.id);

        if (!lodging) {
            return res.status(404).json({
                message: 'Lodging not found'
            });
        }

        // Check if user is the host
        if (lodging.host.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You can only update your own lodgings'
            });
        }

        const updatedLodging = await Lodging.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Lodging updated successfully',
            lodging: updatedLodging
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating lodging',
            error: error.message
        });
    }
});

// Delete lodging (protected route - only host can delete)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const lodging = await Lodging.findById(req.params.id);

        if (!lodging) {
            return res.status(404).json({
                message: 'Lodging not found'
            });
        }

        // Check if user is the host
        if (lodging.host.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You can only delete your own lodgings'
            });
        }

        await Lodging.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Lodging deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting lodging',
            error: error.message
        });
    }
});

export default router;