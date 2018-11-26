const architectureDetails = {
    '1' : {
        "name": "architecture 1",
        "groups": {
          "1": {
            "name": "group 1",
            "isActive": false,
            "relatedGroups": {
              "2": "con1",
              "3": "con2"
            },
            "entities": {
              "1": {
                "name": "entity1",
                "isActive": false,
                "parentEntities": {},
                "questions": [
                  1
                ]
              },
              "2": {
                "name": "entity2",
                "isActive": false,
                "parentEntities": {},
                "questions": [
                  2
                ]
              }
            }
          },
          "2": {
            "name": "group 2",
            "isActive": false,
            "relatedGroups": {},
            "entities": {
              "3": {
                "name": "entity3",
                "isActive": false,
                "parentEntities": {
                    "1": ["1"] 
                },
                "questions": [
                  3
                ]
              },
              "4": {
                "name": "entity4",
                "isActive": false,
                "parentEntities": {
                    "1": ["2"]   
                },
                "questions": [
                  4
                ]
              },
              "12": {
                "name": "entity12",
                "isActive": false,
                "parentEntities": {
                },
                "questions": [
                ]
              },
              "13": {
                "name": "entity13",
                "isActive": false,
                "parentEntities": {
                },
                "questions": [
                ]
              },
            }
          },
          "3": {
            "name": "group 3",
            "isActive": false,
            "relatedGroups": {
              "4": null
            },
            "entities": {
              "5": {
                "name": "entity5",
                "isActive": false,
                "parentEntities": {
                    "1": ["1"]
                },
                "questions": [
                  5
                ]
              },
              "6": {
                "name": "entity6",
                "isActive": false,
                "parentEntities": {
                    "1": ["2"]   
                },
                "questions": [
                  6
                ]
              }
            }
          },
          "4": {
            "name": "group 4",
            "isActive": false,
            "relatedGroups": {
              "5": null
            },
            "entities": {
              "7": {
                "name": "entity7",
                "isActive": false,
                "parentEntities": {
                    "3": ["5"]   
                },
                "questions": [
                  7
                ]
              },
              "8": {
                "name": "entity8",
                "isActive": false,
                "parentEntities": {
                    "3": ["5","6"]   
                },
                "questions": [
                  8
                ]
              }
            }
          },
          "5": {
            "name": "group 5",
            "isActive": false,
            "relatedGroups": {},
            "entities": {
              "9": {
                "name": "entity9",
                "isActive": false,
                "parentEntities": {
                    "4": ["7"]   
                },
                "questions": [
                  9
                ]
              },
              "10": {
                "name": "entity10",
                "isActive": false,
                "parentEntities": {
                    "4": ["8"]   
                },
                "questions": [
                  10
                ]
              },
              "11": {
                "name": "entity11",
                "isActive": false,
                "parentEntities": {
                    "4": ["7","8"]   
                },
                "questions": [
                  10,
                  11
                ]
              }
            }
          }
        }
      }
}

const questionDetails = {
    '1': {
        "groups": {
          "1": [
            {
              "id": "1",
              "question": "Do you need entity1 in your architecture solution?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "2",
              "question": "Do you need entity2 in your architecture solution?",
              "choices": "yes|no",
              "isActive": false
            }
          ],
          "2": [
            {
              "id": "3",
              "question": "Do you need entity3 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "4",
              "question": "Do you need entity4 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            }
          ],
          "3": [
            {
              "id": "5",
              "question": "Do you need entity5 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "6",
              "question": "Do you need entity6 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            }
          ],
          "4": [
            {
              "id": "7",
              "question": "Do you need entity7 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "8",
              "question": "Do you need entity8 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            }
          ],
          "5": [
            {
              "id": "9",
              "question": "Do you need entity9 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "10",
              "question": "Do you need entity10 or  entity 11 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "11",
              "question": "Do you need entity11 in your architecture solution ?",
              "choices": "yes|no",
              "isActive": false
            }
          ]
        }
      }
}

const questionEntityMapping = {
    "1": {
      "1": "yes"
    },
    "2": {
      "2": "yes"
    },
    "3": {
      "3": "yes"
    },
    "4": {
      "4": "yes"
    },
    "5": {
      "5": "yes"
    },
    "6": {
      "6": "yes"
    },
    "7": {
      "7": "yes"
    },
    "8": {
      "8": "yes"
    },
    "9": {
      "9": "yes"
    },
    "10": {
      "10": "yes",
      "11": "no"
    },
    "11": {
      "11": "yes"
    }
  }


const solutionsList = {
    "1":"architecture 1"
}

export {
    architectureDetails,
    solutionsList,
    questionEntityMapping,
    questionDetails
}