module.exports = {
    "testEnvironment": "node",
    forceExit: true,
    "testMatch": [
        "**/(*.)test.js"
    ],
    "setupFiles": [
        "./server/jest.setup.js"
    ]
};