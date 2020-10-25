const _ = require('underscore');
const dotenv = require('dotenv');

const getDB =require('../database').getDB;
dotenv.config();

module.exports = async function categoriesInfo(req, res) {
  const db = getDB();
  const {
      categoryId
    } = req.params;

  try {
    // Finds the category by the given id.
    const category = await db.collection('categories').findOne({
      id: {
        $regex: new RegExp(`\\b${categoryId}\\b`)
      }
    });

    // Renders the proper view with the information it needs.
    res.render('/Wireframes/categoriesPage', {
      // Underscore.js lib
      _,
      // Template data
      data: category,
    });
  } catch (e) {
    res.status(500);
    res.render('error', {
      error: e
    });
  }
};