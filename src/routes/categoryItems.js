const _ = require('underscore');
const dotenv = require('dotenv');

const getDB =require('../database').getDB;

dotenv.config();

module.exports = async function mensCategoryInfo(req, res) {
    const db = getDB();
    const {
        categoryId,
        subcategoryId
    } = req.params;

    try {
        // Gets the name and the page title for the parent category.
        const category = await db.collection('categories').findOne({
            id: categoryId
        });

        // Gets the name of the subcategory.
        const {
            name
        } = category.categories.filter(value => value.id === `${categoryId}-${subcategoryId}`)[0];

        // Gets the products for the subcategory.
        const products = await db.collection('products')
            .find({
                primary_category_id: {
                    $regex: new RegExp(`\\b${categoryId}-${subcategoryId}`)
                }
            }).toArray();

        // Renders the proper view with the information it needs.
        res.render('plp', {
            // Underscore.js lib
            _,
            // Template data
            data: category,
            name: name,
            subcategoryId: subcategoryId,
            products: products,
        });
    } catch (e) {
        res.status(500);
        res.render('error', {
            error: e
        });
    }
};