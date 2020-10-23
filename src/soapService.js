const soap = require('soap');
const url = 'http://infovalutar.ro/curs.asmx?wsdl';

module.exports = function getCurrency(currency) {
    return new Promise((resolve, reject) => {
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