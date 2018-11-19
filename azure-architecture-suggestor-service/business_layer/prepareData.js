const databaseHelper = require('../utilities/databaseHelper');
const {appConfig} = require('../utilities/config');

const prepareDataModule = (()=>{
    const getArchitectureDetails = async () => {

        // Fetch resultset from DB
        let architectureDetails = await databaseHelper.getDataFromDB(appConfig.storedProcedures.getArchitectureDetails);

        // Get recordset and the number of records(tables) is always 1
        let recordset = architectureDetails.recordset;
        let preparedDataObject = {};

        // Prepare object with static fields
        preparedDataObject[recordset[0].architecture_id] = {
            'name': recordset[0].architecture_name,
            'groups': {}
        }

        // Create object for entity grouping/ layers involved in an architecture
        let entityGroups = {};

        // Iterate through each row and prepare the architecture details object
        recordset.forEach((row) => {

            // Initialize object members
            let groupId = `g${row.group_id}`;
            let entityId = `e${row.entity_id}`;
            let entityName = row.entity_name;
            let relatedGroup = row.related_group !== null ? `g${row.related_group}` : null;
            let connector = row.connector !== null ? row.connector : null;
            let questionId = row.question_id !== null ? `q${row.question_id}` : null;
            let parentEntity = row.parent_entities !== null ? `e${row.parent_entities}` : null;

            // If groupId not in entity groups then initialize it with static fields
            if(!(groupId in entityGroups)) {
                entityGroups[groupId] = {
                    'name': row.group_name,
                    'isActive': false,
                    'relatedGroups': {},
                    'entities': {}
                }
            }

            let entityGroup = entityGroups[groupId];
            relatedGroup !== null ? entityGroup.relatedGroups[relatedGroup] = connector : '';

            // If entityId not in entities object then initialize it with static fields
            if(!(entityId in entityGroup.entities)) {
                entityGroup.entities[entityId] = {
                    'name': entityName,
                    'isActive': false,
                    'parentEntities': new Set(),
                    'questions': new Set()
                }
            }

            let entity = entityGroup.entities[entityId];
            parentEntity !== null && entity.parentEntities.add(parentEntity);           
            questionId !== null && entity.questions.add(questionId);
        })
        
        preparedDataObject[recordset[0].architecture_id].groups = entityGroups;
        return preparedDataObject;
    }

    return {
        getArchitectureDetails
    }
})();

module.exports = prepareDataModule;