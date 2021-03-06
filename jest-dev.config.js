module.exports = {
    verbose: true,
    bail: true,
    testURL: "http://localhost/",
    testMatch: [
        "**/client/**/(*.)test.js"
    ],
    setupFiles: [
        "./jest-dev.setup.js"
    ],
    snapshotSerializers: [
        "<rootDir>/node_modules/enzyme-to-json/serializer"
    ],
    moduleNameMapper: {
        "^.+\\.(css|scss)$": "identity-obj-proxy"
    }
};