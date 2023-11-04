function sequence(asyncTasks) {
    let current = 0;

    return new Promise((resolve) => {
        const next = (data) => {
            if (current < asyncTasks.length) {
                asyncTasks[current](data).then(next);
                current++;
            } else {
                resolve(data);
            }
        };

        next();
    });
}

if (require.main === module) {
    const test2 = require("../test/test2");
    test2(require("./task0").sleep, sequence);
} else {
    module.exports = { sequence };
}
