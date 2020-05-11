const asyncRouter = require('./asyncRouter');
const nodeFetch = require('node-fetch');
const winston = require('winston');

module.exports = asyncRouter(async function(req, res, next) {
    const url = 'http://localhost:8888' + req.path;
    const fetchResponse = await nodeFetch(url, {
        method: 'POST', timeout: 150, body: req.body
    })

    const fetchBodyJson = fetchResponse.json();
    winston.log(fetchBodyJson);
    res.body = fetchResponse;
    res.status = fetchResponse.code;
})