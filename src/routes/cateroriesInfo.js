const _ = require('underscore');
const dotenv = require('dotenv');
const mdbClient = require('mongodb').MongoClient;

dotenv.config();

module.exports = async function categoriesInfo(req, res) {
  await mdbClient.connect(process.env.CONNECTIONSTRING,  async (err, client) => {
    const {categoryId} = req.params;
    const db = client.db('shop');
    try{
      // Finds the category by the given id.
      const category = await db.collection('categories').findOne({id: {$regex: new RegExp(`\\b${categoryId}`)}});
      res.render('categoriesPage', {
        // Underscore.js lib
        _,
        // Template data
        category: category,
      });
    }catch (e){
      console.log(e);
    }
  });
};
