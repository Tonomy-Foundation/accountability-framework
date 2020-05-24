module.exports = async function(req, res, next) {
  let retValue = req.addBlockchainRes({my_message: 'respond with a resource'});
  res.status(req.blockchainResStatus);
  res.send(retValue);
}