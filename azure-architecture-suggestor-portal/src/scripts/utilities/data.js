const architectureDetails = {
    '1' : {
        'name':'Some_architecture',
        'groups': {
                'g1': {
                    'name':'group1',
                    'isActive':false,
                    'related_groups':{
                        'group2':'conn1',
                        'group3':'conn2',
                    },
                    'entities': {
                        'e1': {
                                'name':'entity1',
                                'isActive' : false,
                                'parent_entities':[]
                            },
                        'e2':
                            {
                                'name':'entity2',
                                'isActive' : false,
                                'parent_entities':[]
                            }
                    }
                },
                'g2': {
                    'name':'group2',
                    'isActive':false,
                    'related_groups':{
                    },
                    'entities': {
                        'e3': {
                                'name':'entity1',
                                'isActive' : false,
                                'parent_entities':['e1']
                            },
                        'e4':
                            {
                                'name':'entity2',
                                'isActive' : false,
                                'parent_entities':['e2']
                            }
                    }
                },
                'g3': {
                    'name':'group3',
                    'isActive':false,
                    'related_groups':{
                        'group4':''
                    },
                    'entities': {
                        'e5': {
                                'name':'entity5',
                                'isActive' : false,
                                'parent_entities':['e1']
                            },
                        'e6':
                            {
                                'name':'entity6',
                                'isActive' : false,
                                'parent_entities':['e2']
                            }
                    }
                },
                'g4': {
                    'name':'group4',
                    'isActive':false,
                    'related_groups':{
                        'group5':''
                    },
                    'entities': {
                        'e7': {
                                'name':'entity5',
                                'isActive' : false,
                                'parent_entities':['e5']
                            },
                        'e8':
                            {
                                'name':'entity6',
                                'isActive' : false,
                                'parent_entities':['e5', 'e6']
                            }
                    }
                },
                'g5': {
                    'name':'group5',
                    'isActive':false,
                    'related_groups':{
                    },
                    'entities': {
                        'e9': {
                                'name':'entity5',
                                'isActive' : false,
                                'parent_entities':['e7']
                            },
                        'e10':
                            {
                                'name':'entity6',
                                'isActive' : false,
                                'parent_entities':['e8']
                            },
                        'e11':
                        {
                            'name':'entity6',
                            'isActive' : false,
                            'parent_entities':['e7', 'e8']
                        }
                    }
                }
        }
    }
}

const questionDetails = {
    '1': {
        'g1': [
            {
                'question' : 'Do you need entity1 in your architecture solution?',
                'choices' : 'Yes|No',
                'id': '1'
            },
            {
                'question' : 'Do you need entity2 in your architecture solution?',
                'choices' : 'Yes|No',
                'id': '2'
            }
        ],
        'g2': [
            {
                'question' : 'Do you need entity3 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '3'
            },
            {
                'question' : 'Do you need entity4 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '4'
            }
        ],
        'g3': [
            {
                'question' : 'Do you need entity5 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '5'
            },
            {
                'question' : 'Do you need entity6 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '6'
            }
        ],
        'g4': [
            {
                'question' : 'Do you need entity7 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '7'
            },
            {
                'question' : 'Do you need entity8 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '8'
            }
        ],
        'g5': [
            {
                'question' : 'Do you need entity9 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '9'
            },
            {
                'question' : 'Do you need entity10 or entity11 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '10'
            },
            {
                'question' : 'Do you need entity11 in your architecture solution ?',
                'choices' : 'Yes|No',
                'id': '11'
            }
        ]
    }
}

const questionEntityMapping = {
    '1' : {
        'e1' : 'Yes',
    },
    '2' : {
        'e2' : 'Yes',
    },
    '3' : {
        'e3' : 'Yes',
    },
    '4' : {
        'e4' : 'Yes',
    },
    '5' : {
        'e5' : 'Yes',
    },
    '6' : {
        'e6' : 'Yes',
    },
    '7' : {
        'e7' : 'Yes',
    },
    '8' : {
        'e8' : 'Yes',
    },
    '9' : {
        'e9' : 'Yes',
    },
    '10' : {
        'e10' : 'Yes',
        'e11' : 'Yes'
    },
    '11':{
        'e11' : 'No'
    }
}


const solutionsList = {
    '1': 'Some_Architecture',
    '2': 'Some_Architecture2'
}

export {
    architectureDetails,
    solutionsList,
    questionEntityMapping,
    questionDetails
}