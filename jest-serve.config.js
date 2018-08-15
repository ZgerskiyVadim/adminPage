module.exports = {
    verbose: true,
    testEnvironment: "node",
    forceExit: true,
    testMatch: [
        "**/server/**/(*.)test.js"
    ],
    setupFiles: [
        "./jest-serve.setup.js"
    ]
};