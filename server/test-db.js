const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const testURI = process.env.MONGO_URI;

console.log('Testing connection to:', testURI.split('@')[1]); // Log everything after the @ to avoid showing credentials

async function testConnection() {
    try {
        console.log('Attempting to connect...');
        await mongoose.connect(testURI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Success! Connected to MongoDB.');
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Connection failed details:');
        console.error('Code:', err.code);
        console.error('Error Name:', err.name);
        console.error('Message:', err.message);
        process.exit(1);
    }
}

testConnection();
