const soap = require('soap');
const url = 'http://infovalutar.ro/curs.asmx?wsdl';

module.exports = function getCurrency(currency)  {
    soap.createClient(url, function (err, client) {
        client.GetLatestValue({Moneda: currency}, function (err, result) {
            console.log(result);
            return result;
        });
    });
}