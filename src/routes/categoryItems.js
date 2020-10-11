const _ = require('underscore');
const dotenv = require('dotenv');
const mdbClient = require('mongodb').MongoClient;

dotenv.config();

module.exports = async function mensCategoryInfo(req, res) {
    const {categoryId, subcategoryId} = req.params;

    await mdbClient.connect(process.env.CONNECTIONSTRING, async (err, client) => {
        const db = client.db('shop');

        // Gets the name and the page title for the parent category.
        const {name, page_title} = await db.collection('categories').findOne({id: categoryId});
        // Gets the products for the subcategory.
        const products = await db.collection('products')
            .find({primary_category_id: {$regex: new RegExp(`\\b${categoryId}-${subcategoryId}`)}}).toArray();

        // Renders the proper view with the information it needs.
        res.render('categoryItems', {
            _,
            title: page_title,
            categoryId: categoryId,
            subcategoryId: subcategoryId,
            products: products,
            categoryName: name,
        });
    });
};
