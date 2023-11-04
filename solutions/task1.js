function vanillaAll(promises) {
    return new Promise((resolve) => {
        let count = 0;
        const data = [];
        promises.forEach((promise) => {
            promise.then((result) => {
                data.push(result);
                ++count;
            });
            if (count >= promises.length) {
                resolve(data);
            }
        });
    });
}

if (require.main === module) {
    const test1 = require("../test/test1");
    test1(require("./task0").sleep, vanillaAll);
} else {
    module.exports = { all: vanillaAll };
}
