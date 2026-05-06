/**
 * Script to create admin user
 * Run: node scripts/createAdmin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const User = require('../models/User');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const question = (q) => new Promise((resolve) => rl.question(q, resolve));

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food4all');
    console.log('Connected to MongoDB\n');

    const name = await question('Admin name: ');
    const email = await question('Admin email: ');
    const password = await question('Admin password (min 6 chars): ');

    if (!name || !email || !password || password.length < 6) {
      console.error('Invalid input. Name, email and password (min 6 chars) required.');
      process.exit(1);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.error('User with this email already exists.');
      process.exit(1);
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin',
    });

    console.log('\nAdmin user created successfully!');
    console.log('ID:', admin._id);
    console.log('Email:', admin.email);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  }
}

createAdmin();
