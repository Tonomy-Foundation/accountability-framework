const nodeFetch = require('node-fetch');
const settings = require('../settings');
const asyncRouter = require('./asyncRouter');

// Blockchain proxy
// Use the following array for paths that should not be proxied to the blockchain
const blockchainPathBlacklist = ['/new-account'];

const pre = async function(req, res, next) {
    if (blockchainPathBlacklist.includes(req.path)) {
        next();
        return;
    }

    const url = settings.dfuseOptions.secure ? "https://" : "http://" + settings.dfuseOptions.network + req.url;
    options = {
        method: req.method,
        timeout: 10000
    }
    if (req.method === "POST" || req.method === "PUT") {
        let body = typeof req.body === "string" ? JSON.parse(req.body) : req.body
            // body = JSON.stringify(body);
        options.body = JSON.stringify(body);
        req.body = body;
    }
    const fetchResponse = await nodeFetch(url, options);
    const blockchainRes = await fetchResponse.json();

    req.blockchainRes = blockchainRes;
    req.blockchainResStatus = fetchResponse.status;

    req.addBlockchainRes = function(obj = {}) {
        let retObj = obj;
        for (let key in blockchainRes) {
            if (blockchainRes.hasOwnProperty(key)) {
                retObj[key] = blockchainRes[key];
            }
        }
        return retObj;
    }
    next();
}

exports.pre = asyncRouter(pre);

const post = async function(req, res, next) {
    if (blockchainPathBlacklist.includes(req.path)) {
        next();
        return;
    }

    if (req.blockchainRes) {
        res.status(req.blockchainResStatus);
        res.send(req.blockchainRes);
    }
    next();
}

exports.post = asyncRouter(post);