module.exports = {
    verbose: true,
    bail: true,
    testEnvironment: "node",
    forceExit: true,
    testMatch: [
        "**/server/**/(*.)test.js"
    ],
    setupFiles: [
        "./jest-serve.setup.js"
    ]
};