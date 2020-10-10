const _ = require('underscore');
const dotenv = require('dotenv');
const mdbClient = require('mongodb').MongoClient;

dotenv.config();

module.exports = function routeHello(req, res) {
  mdbClient.connect(process.env.CONNECTIONSTRING, (err, client) => {
    const db = client.db('shop');
    const collection = db.collection('categories');

    collection.find().toArray((collErr, items) => {
      res.render('hello', {
        // Underscore.js lib
        _,

        // Template data
        title: 'Hello World!',
        items,
      });
      client.close();
    });
  });
};
