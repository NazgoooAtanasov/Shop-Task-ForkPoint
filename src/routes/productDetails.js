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

            const {link} = product.image_groups.filter(value => value.view_type === 'large')[0]?.images[0];
            const colors = product.variation_attributes.filter(value => value.id === 'color')[0]?.values;
            const sizes = product.variation_attributes.filter(value => value.id === 'size')[0]?.values;
            console.log(sizes);
            res.render('pdp',{
                _,
                imageLink: link,
                sizes: sizes,
                colors: colors,
                data: product
            });
        }
        catch (e) {
            console.log(e);
        }
    });
};
