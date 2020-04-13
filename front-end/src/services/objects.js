export async function wait(ms) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, ms);
    })
}

export function copyObj(obj) {
    return Object.assign({}, obj);
}