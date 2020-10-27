const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

let _db;

const mongoConnect = async (callback) => {
    await MongoClient.connect(process.env.CONNECTIONSTRING, (err, client) => {
        _db = client.db('shop');
        callback();
    })
}

const getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw new Error('DB connect failed');
    }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
