const nodeFetch = require('node-fetch');
const settings = require('../settings');

module.exports.pre = async function(req, res, next) {
    const url = settings.eosio.network + req.path;
    console.log(req.path, req.body)

    req.body = JSON.parse(req.body);
    const bodyObj = JSON.stringify(req.body);
    const fetchResponse = await nodeFetch(url, {
        method: 'POST', timeout: 150, body: bodyObj
    })

    const blockchainRes = await fetchResponse.json();
    req.blockchainRes = blockchainRes;
    req.blockchainResStatus = fetchResponse.status;

    req.addBlockchainRes = function(obj) {
        let retObj = obj ? obj : {};
        for (let key in blockchainRes) {
            if (blockchainRes.hasOwnProperty(key)) {
                retObj[key] = blockchainRes[key];
            }
        }
        return retObj;
    }
    next();
}

module.exports.post = async function(req, res, next) {
    if (req.blockchainRes && !req.blockchainResSent) {
        res.status(req.blockchainResStatus);
        res.send(req.blockchainRes);
    }
}