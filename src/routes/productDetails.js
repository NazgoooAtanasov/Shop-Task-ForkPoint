const _ = require('underscore');
const dotenv = require('dotenv');
const mdbClient = require('mongodb').MongoClient;

dotenv.config();

module.exports = async function productDetails(req, res) {
    await mdbClient.connect(process.env.CONNECTIONSTRING,  async (err, client) => {
        const {productId,categoryId,subcategoryId} = req.params;
        const db = client.db('shop');
        const collection = db.collection('products');
        const product = await collection.findOne({id: productId});

        res.render('productDetails',{
            _,
            title: 'asd',
            product:product,
        })
    });
};
