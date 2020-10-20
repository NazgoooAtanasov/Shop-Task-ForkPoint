const _ = require('underscore');
const dotenv = require('dotenv');
const mdbClient = require('mongodb').MongoClient;
const soapService = require('../soapService');

dotenv.config();

const findPrice = async (currency, itemPrice) =>{
    if(!currency){
        currency = "USD";
        return itemPrice;
    } else {
        // Turn the dollar to lei.
        const lei = await soapService("USD");
        const dollarToLei = itemPrice * lei;
        // Turn lei to the required currency.
        const currencyValue = await soapService(currency);
        const price = dollarToLei / currencyValue;
        return price;
    }
}

module.exports = async function productDetails(req, res) {
    await mdbClient.connect(process.env.CONNECTIONSTRING,  async (err, client) => {
        const {productId, category} = req.params;
        let {currency} = req.params
        const db = client.db('shop');
        const collection = db.collection('products');

        try {
            // Finds a product by a given id.
            const product = await collection.findOne({id: productId});

            const usd = product.price;
            const euro = await findPrice('EUR', product.price);
            const bgn = await findPrice('BGN', product.price);
            // Gets the image url for the product.
            const {link} = product.image_groups.filter(value => value.view_type === 'large')[0]?.images[0];

            // Renders the proper view with the information it needs.
            res.render('pdp',{
                // Underscore.js lib
                _,
                // Template data
                imageLink: link,
                category:category,
                usdPrice: usd,
                euroPrice: Math.round(euro),
                bgnPrice: Math.round(bgn),
                data: product
            });
        }
        catch (e) {
            res.status(500);
            res.render('error',{error: e});
        }
    });
};
