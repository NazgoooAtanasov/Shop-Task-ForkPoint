const soap = require('soap');
const url = 'http://infovalutar.ro/curs.asmx?wsdl';

// Function for getting the value of the currency given in lei.
module.exports = function getCurrency(currency) {
    return new Promise((resolve, reject) => {
        // Calling the soap API.
        soap.createClient(url, (err, client) => {
            client.GetLatestValue({
                Moneda: currency
            }, (err, result, body) => {
                const currency = result.GetLatestValueResult;
                return resolve(currency);
            });
        });
    });
}
