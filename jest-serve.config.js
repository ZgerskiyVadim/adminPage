module.exports = {
    "testEnvironment": "node",
    forceExit: true,
    "testMatch": [
        "**/server/**/(*.)test.js"
    ],
    "setupFiles": [
        "./server/jest.setup.js"
    ]
};