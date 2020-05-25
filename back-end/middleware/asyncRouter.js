// Useful for managing and catching errors in async endpoints
module.exports = function(route) {
    return function(req, res, next) {
        Promise.resolve(route(req, res, next)).catch(next);
    }
}