module.exports = {
    verbose: true,
    testURL: "http://localhost/4000",
    testMatch: [
        "**/client/**/(*.)test.js"
    ],
    setupFiles: [
        "./jest-dev.setup.js"
    ]
};