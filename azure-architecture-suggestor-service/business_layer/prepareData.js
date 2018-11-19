const databaseHelper = require('../utilities/databaseHelper');
const {appConfig} = require('../utilities/config');

const prepareDataModule = (()=>{
    const getArchitectureDetails = async () => {
        let architectureDetails = await databaseHelper.getDataFromDB(appConfig.storedProcedures.getArchitectureDetails);
        
        console.log(architectureDetails);
    }

    return {
        getArchitectureDetails
    }
})();

module.exports = prepareDataModule;