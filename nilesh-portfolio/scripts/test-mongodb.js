/**
 * MongoDB Connection Test Script
 * Run this to verify MongoDB connection
 * 
 * Usage: node scripts/test-mongodb.js
 */

const { MongoClient } = require('mongodb');

// MongoDB URI - change if needed
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const dbName = process.env.DB_NAME || 'portfolio';

async function testConnection() {
  console.log('🔍 Testing MongoDB Connection...\n');
  console.log(`URI: ${uri.replace(/\/\/.*@/, '//***@')}`);
  console.log(`Database: ${dbName}\n`);

  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('⏳ Connecting...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Test database access
    const db = client.db(dbName);
    await db.admin().ping();
    console.log('✅ Database ping successful!\n');

    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:');
    if (collections.length === 0) {
      console.log('   (No collections yet - will be created automatically)\n');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
      console.log('');
    }

    // Test collections
    console.log('🧪 Testing collections...\n');

    // Test projects collection
    const projectsCount = await db.collection('projects').countDocuments();
    console.log(`   Projects: ${projectsCount} documents`);

    // Test contacts collection
    const contactsCount = await db.collection('contacts').countDocuments();
    console.log(`   Contacts: ${contactsCount} documents\n`);

    console.log('✅ All tests passed! MongoDB is ready to use.\n');

  } catch (error) {
    console.error('❌ Connection failed!\n');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MongoDB is running');
    console.error('   2. Check if port 27017 is available');
    console.error('   3. Verify MongoDB URI in .env.local');
    console.error('   4. Try: net start MongoDB (Windows)');
    console.error('   5. Try: sudo systemctl start mongod (Linux)');
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Connection closed.');
    }
  }
}

// Run test
testConnection().catch(console.error);


