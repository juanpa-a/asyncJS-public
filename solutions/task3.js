function resolve({ A, B, C, D, E, F }) {
    /**
     A   B
    / \ /|
   C   D |
    \ / \|
    E   F
    */

    // this one almost makes me cry ❤️‍🩹

    Promise.all([A(), B()]).then(([a, b]) => {
        Promise.all([
            C(a),
            D(a, b).then((d) => {
                F(b, d);
                return d;
            }),
        ]).then(([c, d]) => {
            E(c, d);
        });
    });
}

if (require.main === module) {
    const test3 = require("../test/test3");
    test3(require("./task0").sleep, resolve);
} else {
    module.exports = { resolve };
}
