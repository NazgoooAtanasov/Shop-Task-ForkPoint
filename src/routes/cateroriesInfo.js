const _ = require('underscore');
const dotenv = require('dotenv');
const mdbClient = require('mongodb').MongoClient;

dotenv.config();

module.exports = async function categoriesInfo(req, res) {
  const {categoryId} = req.params;

  await mdbClient.connect(process.env.CONNECTIONSTRING,  async (err, client) => {
    const db = client.db('shop');
    const collection = db.collection('categories');
    const [{page_title, name, page_description,categories}] = await collection.find({id: categoryId}).toArray();

    res.render('categoriesPage', {
      // Underscore.js lib
      _,
      // Template data
      title: page_title,
      categoryName: name,
      categoryDesc: page_description,
      categories: categories,
    });
  });
};
