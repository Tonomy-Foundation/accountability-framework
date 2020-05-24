const nodeFetch = require('node-fetch');
const settings = require('../settings');
const asyncRouter = require('./asyncRouter');

// Blockchain proxy
// Use the following array for paths that should not be proxied to the blockchain
const blockchainPathBlacklist = ['/new-account'];

const pre = async function(req, res, next) {
    if (blockchainPathBlacklist.includes(req.path)) {
        console.log("skipping proxy pre")
        next();
        return;
    }
    console.log("Proxy pre, ", req.path)
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

exports.pre = function(req, res, next) {
    console.log("first middleware");
    const prom = pre(req, res, next);
    Promise.resolve(prom);
};

const post = async function(req, res, next) {
    if (blockchainPathBlacklist.includes(req.path)) {
        console.log("skipping proxy post")
        next();
        return;
    }
    console.log("Proxy post")
    if (req.blockchainRes && !req.blockchainResSent) {
        res.status(req.blockchainResStatus);
        res.send(req.blockchainRes);
    }
    next();
}

exports.post = function(req, res, next) {
    console.log("last middleware");
    const prom = post(req, res, next);
    Promise.resolve(prom);
};