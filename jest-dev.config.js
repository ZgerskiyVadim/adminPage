module.exports = {
    verbose: true,
    testURL: "http://localhost/4000",
    testMatch: [
        "**/client/**/(*.)test.js"
    ],
    setupFiles: [
        "./jest-dev.setup.js"
    ],
    "snapshotSerializers": [
        "<rootDir>/node_modules/enzyme-to-json/serializer"
    ],
    "moduleNameMapper": {
        "^.+\\.(css|scss)$": "identity-obj-proxy"
    }
};