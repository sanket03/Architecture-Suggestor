const architectureDataObj = {
    '1' : {
        'name':'Data Warehousing and Reporting',
        'type':'some_type',
        'levels': [
            {
                'level':'1',
                'name':'Upstream Data Sources',
                'options':[
                    {
                        'id':'111',
                        'name':'Azure SQL DB',
                        'isActive' : false,
                        'parent_entities':[]
                    },
                    {
                        'id':'112',
                        'name':'Stream Sources',
                        'isActive' : false,
                        'parent_entities':[]
                    }
                ]
            },
            {
                'level':'2',
                'name':'Ingestion',
                'options':[
                    {
                        'id':'111',
                        'name':'Azure SQL DB',
                        'isActive' : false,
                        'parent_entities':['111']
                    },
                    {
                        'id':'113',
                        'name':'ADLS',
                        'isActive' : false,
                        'parent_entities':['111']
                    },
                    {
                        'id':'114',
                        'name':'Event Hub',
                        'isActive' : false,
                        'parent_entities':['112']
                    }
                ]
            },
            {
                'level':'3',
                'name':'Staging',
                'options':[
                    {
                        'id':'111',
                        'name':'Azure SQL DB',
                        'isActive' : false,
                        'parent_entities':['111']
                    },
                    {
                        'id':'115',
                        'name':'ADW',
                        'isActive' : false,
                        'parent_entities':['111']
                    },
                    {
                        'id':'116',
                        'name':'AML',
                        'isActive' : false,
                        'parent_entities':['111,112']
                    },
                    {
                        'id':'117',
                        'name':'Cognitive Services',
                        'isActive' : false,
                        'parent_entities':['111,112']
                    },
                    {
                        'id':'118',
                        'name':'HD Insights',
                        'isActive' : false,
                        'parent_entities':['111,112']
                    },
                    {
                        'id':'119',
                        'name':'Stream Analytics',
                        'isActive' : false,
                        'parent_entities':['112']
                    }
                ]
            },
            {
                'level':'4',
                'name':'Publishing',
                'options':[
                    {
                        'id':'111',
                        'name':'Azure SQL DB',
                        'isActive' : false,
                        'parent_entities':['111,116,117']
                    },
                    {
                        'id':'115',
                        'name':'ADW',
                        'isActive' : false,
                        'parent_entities':['115','116','117','118','119']
                    },
                    {
                        'id':'116',
                        'name':'AML Web Services',
                        'isActive' : false,
                        'parent_entities':['115','116','117','118','119']
                    },
                    {
                        'id':'117',
                        'name':'Cloud Services',
                        'isActive' : false,
                        'parent_entities':['115','116','117','118','119']
                    }
                ]
            },
            {
                'level':'5',
                'name':'Consumption',
                'options':[
                    {
                        'id':'122',
                        'name':'Power BI',
                        'isActive' : false,
                        'parent_entities':['111,115,120,121']
                    },
                    {
                        'id':'123',
                        'name':'HTML Reports',
                        'isActive' : false,
                        'parent_entities':['111,115,120,121']
                    }
                ]
            },
        ]
    }
}


const questionsObj = {
    '1': {
        '1': [
            {
                'question' : 'Do you need Realtime Streaming or something similar to SQL DB will do?',
                'choices' : 'Non Realtime|Realtime',
                'id': '1'
            }
        ],
        '2': [
            {
                'question' : 'Do you need a single store for file system and object data?',
                'choices' : 'Yes|No',
                'id':'2'
            }
        ],
        '3': [
            {
                'question' : 'Do you want to apply machine learning on your data?',
                'choices' : 'Yes|No',
                'id':'3'
            }, 
            {
                'question' : 'Do you need to embrace the power of Cognitive services?',
                'choices' : 'Yes|No',
                'id':'4'
            }
        ],
        '4': [
            {
                'question' : 'Is there a need to consume data from multiple sources and report it without much development effort?',
                'choices' : 'Yes|No',
                'id':'5'
            }
        ]
    }
}

const filterAzureIdentityMapping = {
    '1' : {
        '111' : 'Non Realtime',
        '112' : 'Realtime'
    },
    '2' : {
        '113' : 'Yes'
    },
    '3' : {
        '116' : 'Yes'
    },
    '4' : {
        '117' : 'Yes'
    },
    '5' : {
        '122' : 'Yes'
    }
}


const solutionsList = {
    '1': 'Data Warehousing and Reporting'
}


export {
    solutionsList,
    filterAzureIdentityMapping,
    architectureDataObj,
    questionsObj
}