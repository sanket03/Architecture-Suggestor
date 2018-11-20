const sql = require('mssql');
const {appConfig} = require('./config');

const databaseHelper = (() => {
    let {
        userName,
        sqlServerName,
        password,
        port,
        dbName
    } = appConfig.connectionDetails;

    const getDataFromDB = async (sp, paramList=[]) => {
        try {
            await sql.connect(`${userName}:${password}@${sqlServerName}:${port}/${dbName}`)
            const request = new sql.Request();

            // Set input parameters for request
            paramList.forEach((param) => {
                request.input(param.input, sql[param.type], param.value)
            })

            let queryResponse =  await request.execute(sp);
            sql.close();
            return queryResponse;
        } catch (err) {
            console.log(err)
        }
    }
    return {
        getDataFromDB
    }
})()

module.exports = databaseHelper;