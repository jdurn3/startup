const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('climbcoord');
const userCollection = db.collection('user');
const tripsCollection = db.collection('trips');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function getAllTrips() {
  try {
    const trips = await tripsCollection.find({}).toArray();
    return trips;
  } catch (error) {
    console.error('Error fetching all trips:', error);
    throw error;
  }
}

async function addTrip(tripData) {
  try {
    const result = await tripsCollection.insertOne(tripData);
    return result.insertedId; // Return the ID of the inserted document
  } catch (error) {
    console.error('Error adding trip:', error);
    throw error;
  }
}

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

module.exports = {
    getUser,
    createUser,
    getUserByToken, 
    getAllTrips,
    addTrip
  };