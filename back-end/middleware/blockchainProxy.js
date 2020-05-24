const nodeFetch = require('node-fetch');
const settings = require('../settings');

exports.pre = async function(req, res, next) {
    console.log("Proxy pre")
    const url = settings.eosio.network + req.path;

    req.body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const fetchResponse = await nodeFetch(url, {
        method: 'POST', timeout: 150, body: JSON.stringify(req.body)
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

exports.post = async function(req, res, next) {
    console.log("Proxy post")
    if (req.blockchainRes && !req.blockchainResSent) {
        // res.status(req.blockchainResStatus);
        // res.send(req.blockchainRes);
    }
    next();
}