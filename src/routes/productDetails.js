const _ = require('underscore');
const dotenv = require('dotenv');

const soapService = require('../soapService');
const getDB = require('../database').getDB;

dotenv.config();

// Function used to calculate the the price in given currency.
const findPrice = async (currency, itemPrice) => {
    if (!currency) {
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
    const database = getDB();

    const {
        productId,
        category
    } = req.params;

    try {
        const collection = await database.collection('products');

        // Finds a product by a given id.
        const product = await collection.findOne({
            id: productId
        });

        // This section calculates the price in different currencies.
        const usd = product.price;
        const euro = await findPrice('EUR', product.price);
        const bgn = await findPrice('BGN', product.price);

        // Gets the image url for the product.
        const {
            link
        } = product.image_groups.filter(value => value.view_type === 'large')[0]?.images[0];

        // Renders the proper view with the information it needs.
        res.render('pdp', {
            // Underscore.js lib
            _,
            // Template data
            imageLink: link,
            category: category,
            usdPrice: usd,
            euroPrice: Math.round(euro),
            bgnPrice: Math.round(bgn),
            data: product
        });
    } catch (e) {
        res.status(500);
        res.render('error', {
            error: e
        });
    }
};
