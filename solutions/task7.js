function first(promises) {
    let errors = 0;
    let maxErrors = promises.length;

    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            promise.then(resolve).catch(() => {
                errors++;
                if (errors >= maxErrors) {
                    reject();
                }
            });
        });
    });
}

if (require.main === module) {
    const test7 = require("../test/test7");
    test7(require("./task0").sleep, first);
} else {
    module.exports = { first };
}
