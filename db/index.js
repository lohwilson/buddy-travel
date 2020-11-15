const MongoClient = require('mongodb').MongoClient;

// const MONGO_URL = 'mongodb://localhost:27017';
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = 'project';
const COLLECTIONS = {
    USERS: 'users',
    TRAVEL: 'travel'
};

const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

module.exports = {
    async connect () {
        const connection = await client.connect();
        console.log('Connected to MongoDB');
        const db = connection.db(DB_NAME);
        this.users = db.collection(COLLECTIONS.USERS);
        this.travel = db.collection(COLLECTIONS.TRAVEL);
    },
    disconnect () {
        return client.close();
    },
};
