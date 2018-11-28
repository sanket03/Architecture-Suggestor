const appModule = (() => {
    let appConfig = {};
    appConfig.controllers = {};
    appConfig.url = 'http://localhost:3001/';
    appConfig.controllers.getArchitecturesList = 'GetArchitecturesList';
    appConfig.controllers.getArchitectureDetails = 'GetArchitectureDetails';
    appConfig.controllers.getQuestionDetails = 'GetQuestionDetails';
    appConfig.controllers.getQuestionEntityMapping = 'GetQuestionEntityMapping'
    return {
        appConfig
    }
})();

export default appModule;