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

            const {link} = product.image_groups.filter(value => value.view_type == 'large')[0].images[0];

            res.render('productDetails',{
                _,
                imageLink: link,
                data: product
            });
        }
        catch (e) {
            console.log(e);
        }
    });
};
