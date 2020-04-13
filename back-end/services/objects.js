module.exports.wait = async function(ms) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, ms);
    })
}

module.exports.copyObj = function copyObj(obj) {
    return Object.assign({}, obj);
}