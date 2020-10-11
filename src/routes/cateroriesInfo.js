const _ = require('underscore');
const dotenv = require('dotenv');
const mdbClient = require('mongodb').MongoClient;

dotenv.config();

module.exports = async function categoriesInfo(req, res) {
  await mdbClient.connect(process.env.CONNECTIONSTRING,  async (err, client) => {
    const {categoryId} = req.params;
    const db = client.db('shop');
    const collection = db.collection('categories');

    // Finds the category by the given id.
    const {page_title, name, page_description,categories} = await collection.findOne({id: categoryId});

    res.render('categoriesPage', {
      // Underscore.js lib
      _,
      // Template data
      title: page_title,
      categoryId: categoryId,
      categoryName: name,
      categoryDesc: page_description,
      categories: categories,
    });
  });
};
