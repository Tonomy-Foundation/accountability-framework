const nodeFetch = require('node-fetch');
const settings = require('../settings');

module.exports.pre = async function(req, res, next) {
    const url = settings.eosio.network + req.path;
    const fetchResponse = await nodeFetch(url, {
        method: 'POST', timeout: 150, body: req.body
    })

    const blockchainRes = await fetchResponse.json();
    // console.log(blockchainRes);
    // winston.log(blockchainRes);
    req.blockchainRes = blockchainRes;

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
        res.status(req.blockchainRes.code);
        res.send(req.blockchainRes);
    }
}