const architectureDataObj = {
    '1' : {
        'name':'Data Warehousing and Reporting',
        'type':'some_type',
        'levels': {
                '1': {
                    'name':'Upstream Data Sources',
                    'isActive':false,
                    'options': {
                        '111': {
                                'name':'Azure SQL DB',
                                'isActive' : false,
                                'parent_entities':[]
                            },
                        '112':
                            {
                                'name':'Stream Sources',
                                'isActive' : false,
                                'parent_entities':[]
                            }
                    }
                },
                '2': {
                    'name':'Ingestion',
                    'isActive':false,
                    'options': {
                        '111': {
                                'name':'Azure SQL DB',
                                'isActive' : false,
                                'parent_entities':['111']
                            },
                        '113':
                            {
                                'name':'ADLS',
                                'isActive' : false,
                                'parent_entities':['111']
                            },
                        '114':
                        {
                            'name':'Event Hub',
                            'isActive' : false,
                            'parent_entities':['112']
                        }
                    }
                },
                '3': {
                    'name':'Staging',
                    'isActive':false,
                    'options': {
                        '111': {
                                'name':'Azure SQL DB',
                                'isActive' : false,
                                'parent_entities':['111']
                            },
                        '115':
                            {
                                'name':'ADW',
                                'isActive' : false,
                                'parent_entities':['111']
                            },
                        '116':
                        {
                            'name':'AML',
                            'isActive' : false,
                            'parent_entities':['111','114']
                        },
                        '117':
                        {
                            'name':'Cognitive Services',
                            'isActive' : false,
                            'parent_entities':['111','114']
                        },
                        '118':
                        {
                            'name':'HD Insights',
                            'isActive' : false,
                            'parent_entities':['111','114']
                        },
                        '119':
                        {
                            'name':'Stream Analytics',
                            'isActive' : false,
                            'parent_entities':['114']
                        }
                    }
                },
                '4':{
                    'name':'Publishing',
                    'isActive':false,
                    'options': {
                        '111': {
                                'name':'Azure SQL DB',
                                'isActive' : false,
                                'parent_entities':['111','116','117']
                            },
                        '115':
                            {
                                'name':'ADW',
                                'isActive' : false,
                                'parent_entities':['115','116','117','118','119']
                            },
                        '116':
                        {
                            'name':'AML Web Services',
                            'isActive' : false,
                            'parent_entities':['115','116','117','118','119']
                        },
                        '121':
                        {
                            'name':'Cloud Services',
                            'isActive' : false,
                            'parent_entities':['115','116','117','118','119']
                        }
                    }
                },
                '5': {
                    'name':'Consumption',
                    'isActive':false,
                    'options': {
                        '122': {
                                'name':'Power BI',
                                'isActive' : false,
                                'parent_entities':['116','111','115','121']
                        },
                        '123':{
                                'name':'HTML Reports',
                                'isActive' : false,
                                'parent_entities':['116','111','115','121']
                        }
                    }
                }
            }
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
                'question' : 'Do you need to embrace the power of Cognitive services?',
                'choices' : 'Yes|No',
                'id':'4'
            }
        ],
        '4': [
            {
                'question' : 'Do you want to apply machine learning on your data?',
                'choices' : 'Yes|No',
                'id':'3'
            }
        ],
        '5': [
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