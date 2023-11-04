function asyncInParallel(work, threads) {
    let current = threads;
    let data = [];

    return new Promise((resolve) => {
        const next = (res) => {
            data.push(res);
            if (current < work.length - 1) {
                work[current++]().then(next);
            } else {
                resolve(data);
            }
        };

        work.slice(0, threads).forEach((fn) => {
            fn().then((res) => {
                data.push(res);
                next(res);
            });
        });
    });
}

if (require.main === module) {
    const test4 = require("../test/test4");
    test4(require("./task0").sleep, asyncInParallel);
} else {
    module.exports = { asyncInParallel };
}
