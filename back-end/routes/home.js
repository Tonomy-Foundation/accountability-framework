module.exports = async function(req, res, next) {
  let retObj = req.addBlockchainRes({my_message: 'respond with a resource'})
  res.status(req.blockchainRes.code);
  res.send(retObj);
}