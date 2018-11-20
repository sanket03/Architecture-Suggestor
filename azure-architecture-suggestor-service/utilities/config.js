const appModule = (() => {
    let appConfig = {};
    appConfig.storedProcedures = {};
    appConfig.connectionDetails = {};
    appConfig.storedProcedures.getArchitecturesList = 'dbo.usp_GetArchitecturesList';
    appConfig.storedProcedures.getArchitectureDetails = 'dbo.usp_GetArchitectureDetails';
    appConfig.storedProcedures.getQuestionDetails = 'dbo.usp_GetQuestionDetails';
    appConfig.storedProcedures.getQuestionEntityMapping = 'dbo.usp_GetQuestionEntityMapping';
    appConfig.connectionDetails.sqlServerName= 'localhost';
    appConfig.connectionDetails.userName = 'mssql://sa';
    appConfig.connectionDetails.password = 'Pass@123';
    appConfig.connectionDetails.port = '1433';
    appConfig.connectionDetails.dbName = 'Azure_Architecture_Suggestion'

    return {
        appConfig
    }
})();

module.exports = appModule;