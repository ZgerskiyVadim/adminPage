export default {
    port: 8080,
    loggerFileName: 'logInfo.log',
    dbName: 'mongodb://localhost/adminPage',
    dbForTestsName: 'mongodb://localhost/testAdminPage',
    static: '../client',
    favicon: '../client/asserts/favicon.ico',
    sessionName: 'userSession',
    sessionSecret: 'secretKey',
    saltBcrypt: 10
};