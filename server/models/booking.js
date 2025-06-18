import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    lodging: {
        type: Schema.Types.ObjectId,
        ref: 'Lodging',
        required: true
    },
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    specialRequests: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

export default model('Booking', bookingSchema);