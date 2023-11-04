function addRetries(task, numberOfRetries) {
    let retries = 0;
    return () => new Promise((resolve, reject) => {
        const withRetries = () => {
            if (retries++ < numberOfRetries) {
                task()
                    .then((data) => resolve(data))
                    .catch(withRetries);
            } else {
                reject("counter too low");
            }
        };
    });
}

if (require.main === module) {
    const test5 = require("../test/test5");
    test5(addRetries);
} else {
    module.exports = { addRetries };
}
