function resolve({ A, B, C, D, E, F }) {
    let x = [A, B, C];
    let y = [D, E, F];
    let hasFinished = false;

    function race(promises) {
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

    function sequence(asyncTasks) {
        let current = 0;
        return new Promise((resolve) => {
            const next = () => {
                if (hasFinished) {
                    return
                }
                if (current < asyncTasks.length) {
                    asyncTasks[current]().then(next);
                    current++;
                } else {
                    hasFinished = true
                    resolve();
                }
            };

            next();
        });
    }

    return race([sequence(x), sequence(y)]);
}

if (require.main === module) {
    const test8 = require("../test/test8");
    test8(require("./task0").sleep, resolve);
} else {
    module.exports = { resolve };
}
