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

    const getDataFromDB = async (sp) => {
        try {
            await sql.connect(`${userName}:${password}@${sqlServerName}:${port}/${dbName}`)
            const request = new sql.Request();
            return await request.execute(sp);
        } catch (err) {
            console.log(err)
        }
    }
    return {
        getDataFromDB
    }
})()

module.exports = databaseHelper;