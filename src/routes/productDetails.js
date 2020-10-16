const _ = require('underscore');
const dotenv = require('dotenv');
const mdbClient = require('mongodb').MongoClient;

dotenv.config();

module.exports = async function productDetails(req, res) {
    await mdbClient.connect(process.env.CONNECTIONSTRING,  async (err, client) => {
        const {productId} = req.params;
        const db = client.db('shop');
        const collection = db.collection('products');

        try {
            // Finds a product by a given id.
            const product = await collection.findOne({id: productId});

            // Gets the image url for the product.
            const {link} = product.image_groups.filter(value => value.view_type === 'large')[0]?.images[0];
            // Gets the color array of the product.
            const colors = product.variation_attributes.filter(value => value.id === 'color')[0]?.values;
            // Gets the size array of the product.
            const sizes = product.variation_attributes.filter(value => value.id === 'size')[0]?.values;

            // Renders the proper view with the information it needs.
            res.render('../Wireframes/productDetails',{
                // Underscore.js lib
                _,
                // Template data
                imageLink: link,
                sizes: sizes,
                colors: colors,
                data: product
            });
        }
        catch (e) {
            res.status(500);
            res.render('error',{error: e});
        }
    });
};
