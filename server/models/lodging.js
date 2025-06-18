import { Schema, model } from 'mongoose';

const lodgingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    maxGuests: {
        type: Number,
        required: true,
        min: 1
    },
    bedrooms: {
        type: Number,
        required: true,
        min: 1
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 1
    },
    images: [{
        type: String 
    }],
    amenities: [{
        type: String
    }],
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default model('Lodging', lodgingSchema);