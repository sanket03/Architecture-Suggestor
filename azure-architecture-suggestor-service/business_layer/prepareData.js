const databaseHelper = require('../utilities/databaseHelper');
const {appConfig} = require('../utilities/config');

const prepareDataModule = (()=>{
    
    // Get list of available architectures
    const getArchitecturesList = async () => {
        let architecturesList = await databaseHelper.getDataFromDB(appConfig.storedProcedures.getArchitecturesList);

        // Get recordset and the number of records(tables) is always 1
        let recordset = architecturesList.recordset;
        let preparedDataObject = {};

        recordset.forEach((row) => {
            preparedDataObject[row.architecture_id] = row.architecture_name
        })

        return preparedDataObject;
    }

    // Get details for an architecture
    const getArchitectureDetails = async (architectureId) => {

        // Create params
        let params = [{
            'input': 'architecture_id',
            'value': architectureId,
            'type' : 'TinyInt'
        }]

        // Fetch resultset from DB
        let architectureDetails = await databaseHelper.getDataFromDB(appConfig.storedProcedures.getArchitectureDetails, params);


        // Get recordset and the number of records(tables) is always 1
        let recordset = architectureDetails.recordset;

        // Prepare object with static fields
        let preparedDataObject = {
            'name': recordset[0].architecture_name,
            'groups': {}
        }

        // Create object for entity grouping/ layers involved in an architecture
        let entityGroups = {};

        // Iterate through each row and prepare the architecture details object
        recordset.forEach((row) => {

            // Initialize object members
            let groupId = row.group_id;
            let entityId = row.entity_id;
            let entityName = row.entity_name;
            let relatedGroup = row.related_group;
            let connector = row.connector;
            let questionId = row.question_id;
            let parentEntity = row.parent_entities

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
                    'parentEntities': [],
                    'questions': []
                }
            }

            // Set parent entities and related groups for an entity
            let entity = entityGroup.entities[entityId];
            parentEntity !== null && !entity.parentEntities.includes(parentEntity) && entity.parentEntities.push(parentEntity);
            questionId !== null && !entity.questions.includes(questionId) && entity.questions.push(questionId);   
        })     
        preparedDataObject.groups = entityGroups;
        return preparedDataObject;
    }

    // Get details for questions related to an architecture
    const getQuestionDetails = async (architectureId) => {

        // Create params
        let params = [{
            'input': 'architecture_id',
            'value': architectureId,
            'type' : 'TinyInt'
        }]

        let questionDetails = await databaseHelper.getDataFromDB(appConfig.storedProcedures.getQuestionDetails, params);

        // Get recordset as the number of records(tables) is always 1
        let recordset = questionDetails.recordset;

        // Prepare object with static fields
        let preparedDataObject = {
            'groups' : {}
        };

        let entityGroups = preparedDataObject.groups;
        
        recordset.forEach((row) => {
            let groupId = row.group_id;
            let questionId = row.question_id;
            let description = row.description;
            let choices = row.choices;

            if(!(groupId in entityGroups)) {
                entityGroups[groupId] = [];
            }

            // Initialize question object and push it to the list of questions for a group
            let questionObj = {
                'id': questionId.toString(),
                'question' : description,
                'choices': choices,
                'isActive': false
            }
            entityGroups[groupId].push(questionObj);
        })
        return preparedDataObject;
    }
    
    // Get question to entity mapping
    const getQuestionEntityMapping = async () => {
        let questionEntityMap = await databaseHelper.getDataFromDB(appConfig.storedProcedures.getQuestionEntityMapping);

        // Get recordset and the number of records(tables) is always 1
        let recordset = questionEntityMap.recordset;
        let preparedDataObject = {};

        recordset.forEach((row) => {
            let questionId = row.question_id;
            let entityId = row.entity_id;
            let options = row.option;

            if(!(questionId in preparedDataObject)) {
                preparedDataObject[questionId] = {};
            }

            if(!(entityId in preparedDataObject[questionId])) {
                preparedDataObject[questionId][entityId] = {}
            }
            preparedDataObject[questionId][entityId] = options;
        })
        return preparedDataObject;
    }

    return {
        getArchitecturesList,
        getArchitectureDetails,
        getQuestionDetails,
        getQuestionEntityMapping
    }
})();

module.exports = prepareDataModule;