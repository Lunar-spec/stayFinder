import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import User from './models/user.js';
import Lodging from './models/lodging.js';
import { sampleLodgings } from './sampleLodgings.js';

dotenv.config();

// Sample users to act as hosts
const sampleUsers = [
    {
        name: "John Smith",
        email: "john.smith@example.com",
        password: "password123"
    },
    {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        password: "password123"
    },
    {
        name: "Mike Davis",
        email: "mike.davis@example.com",
        password: "password123"
    },
    {
        name: "Emily Brown",
        email: "emily.brown@example.com",
        password: "password123"
    },
    {
        name: "David Wilson",
        email: "david.wilson@example.com",
        password: "password123"
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://smanjesh1854:xTnqI7sSA13oOD39@cluster0.rpalfxu.mongodb.net/');
        console.log('Connected to MongoDB');

        // Clear existing data (optional - comment out if you want to keep existing data)
        console.log('Clearing existing data...');
        await Lodging.deleteMany({});
        await User.deleteMany({});
        console.log('Existing data cleared');

        // Create sample users
        console.log('Creating sample users...');
        const createdUsers = [];

        for (const userData of sampleUsers) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = new User({
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            });
            const savedUser = await user.save();
            createdUsers.push(savedUser);
            console.log(`Created user: ${userData.name}`);
        }

        // Create sample lodgings
        console.log('Creating sample lodgings...');
        const createdLodgings = [];

        for (let i = 0; i < sampleLodgings.length; i++) {
            const lodgingData = sampleLodgings[i];
            // Randomly assign hosts to lodgings
            const randomHostIndex = Math.floor(Math.random() * createdUsers.length);
            const host = createdUsers[randomHostIndex];

            const lodging = new Lodging({
                ...lodgingData,
                host: host._id
            });

            const savedLodging = await lodging.save();
            createdLodgings.push(savedLodging);
            console.log(`Created lodging: ${lodgingData.title} (Host: ${host.name})`);
        }

        console.log('\n=== DATABASE SEEDING COMPLETED ===');
        console.log(`Created ${createdUsers.length} users`);
        console.log(`Created ${createdLodgings.length} lodgings`);

        console.log('\n=== SAMPLE LOGIN CREDENTIALS ===');
        sampleUsers.forEach(user => {
            console.log(`Email: ${user.email} | Password: ${user.password}`);
        });

        console.log('\n=== SAMPLE LODGING IDs ===');
        createdLodgings.forEach(lodging => {
            console.log(`${lodging.title}: ${lodging._id}`);
        });

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
        process.exit(0);
    }
}

// Run the seeding function
seedDatabase();