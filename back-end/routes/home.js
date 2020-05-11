module.exports = async function(req, res, next) {
  req.blockchainResSent = true;
  let retValue = req.addBlockchainRes({my_message: 'respond with a resource'});
  res.status(req.blockchainRes.code);
  res.send(retValue);
}