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
      },
      '2':{
        "name": "Big Data Solution",
        "groups": {
          "1": {
            "name": "Datasources",
            "isActive": false,
            "relatedGroups": {
              "2": null
            },
            "entities": {
              "12": {
                "name": "Logs & Files",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  18
                ]
              },
              "13": {
                "name": "Sensors & IoT",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  18
                ]
              },
              "14": {
                "name": "Events & Streams",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  18
                ]
              },
              "15": {
                "name": "Business Apps(Structured Data)",
                "isActive": true,
                "parentEntities": {},
                "questions": []
              }
            }
          },
          "2": {
            "name": "Ingestion",
            "isActive": false,
            "relatedGroups": {
              "3": null
            },
            "entities": {
              "16": {
                "name": "Azure Data Factory",
                "isActive": true,
                "parentEntities": {
                  "1": [
                    "12",
                    "15"
                  ]
                },
                "questions": []
              },
              "17": {
                "name": "IoT Hub",
                "isActive": true,
                "parentEntities": {
                  "1": [
                    "13"
                  ]
                },
                "questions": [
                  23
                ]
              },
              "18": {
                "name": "Azure HD Insights",
                "isActive": true,
                "parentEntities": {
                  "1": [
                    "13",
                    "14"
                  ]
                },
                "questions": [
                  20,
                  21
                ]
              },
              "19": {
                "name": "Event Hub",
                "isActive": true,
                "parentEntities": {
                  "1": [
                    "14"
                  ]
                },
                "questions": []
              }
            }
          },
          "3": {
            "name": "Data Store",
            "isActive": false,
            "relatedGroups": {
              "4": null
            },
            "entities": {
              "20": {
                "name": "Azure Blob Storage",
                "isActive": true,
                "parentEntities": {
                  "2": [
                    "16",
                    "17",
                    "18",
                    "19"
                  ]
                },
                "questions": [
                  15,
                  17
                ]
              },
              "21": {
                "name": "Azure DataLake",
                "isActive": true,
                "parentEntities": {
                  "2": [
                    "16",
                    "17",
                    "18",
                    "19"
                  ]
                },
                "questions": [
                  15,
                  17
                ]
              },
              "22": {
                "name": "Azure CosmosDB",
                "isActive": true,
                "parentEntities": {
                  "2": [
                    "17",
                    "18",
                    "19"
                  ]
                },
                "questions": [
                  16,
                  20
                ]
              }
            }
          },
          "4": {
            "name": "Train and Prepare",
            "isActive": false,
            "relatedGroups": {
              "5": null
            },
            "entities": {
              "18": {
                "name": "Azure HD Insights",
                "isActive": true,
                "parentEntities": {
                  "3": [
                    "20",
                    "21"
                  ]
                },
                "questions": [
                  20,
                  21
                ]
              },
              "23": {
                "name": "Azure Machine Learning",
                "isActive": true,
                "parentEntities": {
                  "3": [
                    "20",
                    "21",
                    "22"
                  ]
                },
                "questions": [
                  19
                ]
              },
              "24": {
                "name": "Stream Analytics",
                "isActive": true,
                "parentEntities": {
                  "3": [
                    "20"
                  ]
                },
                "questions": []
              },
              "25": {
                "name": "Azure Data Bricks",
                "isActive": true,
                "parentEntities": {
                  "3": [
                    "20",
                    "21"
                  ]
                },
                "questions": [
                  19
                ]
              },
              "26": {
                "name": "Azure Functions",
                "isActive": true,
                "parentEntities": {
                  "3": [
                    "20",
                    "22"
                  ]
                },
                "questions": [
                  19
                ]
              },
              "27": {
                "name": "Azure Data Lake Analytics",
                "isActive": true,
                "parentEntities": {
                  "3": [
                    "20",
                    "21"
                  ]
                },
                "questions": []
              }
            }
          },
          "5": {
            "name": "Modeling",
            "isActive": false,
            "relatedGroups": {
              "6": null
            },
            "entities": {
              "18": {
                "name": "Azure HD Insights",
                "isActive": true,
                "parentEntities": {
                  "4": [
                    "18"
                  ]
                },
                "questions": [
                  20,
                  21
                ]
              },
              "22": {
                "name": "Azure CosmosDB",
                "isActive": true,
                "parentEntities": {
                  "4": [
                    "18",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27"
                  ]
                },
                "questions": [
                  16,
                  20
                ]
              },
              "28": {
                "name": "Azure SQL DB",
                "isActive": true,
                "parentEntities": {
                  "4": [
                    "24",
                    "18",
                    "25"
                  ]
                },
                "questions": [
                  20,
                  21,
                  22
                ]
              },
              "29": {
                "name": "Azure DW",
                "isActive": true,
                "parentEntities": {
                  "4": [
                    "24",
                    "18",
                    "25",
                    "26"
                  ]
                },
                "questions": [
                  22
                ]
              }
            }
          },
          "6": {
            "name": "Publish and Report",
            "isActive": false,
            "relatedGroups": {},
            "entities": {
              "30": {
                "name": "PowerBI",
                "isActive": true,
                "parentEntities": {
                  "5": [
                    "28",
                    "29",
                    "22",
                    "18"
                  ]
                },
                "questions": [
                  12,
                  13,
                  14
                ]
              },
              "31": {
                "name": "WebApps",
                "isActive": true,
                "parentEntities": {
                  "5": [
                    "28",
                    "29",
                    "22"
                  ]
                },
                "questions": [
                  12,
                  13
                ]
              },
              "32": {
                "name": "Microsoft Excel",
                "isActive": true,
                "parentEntities": {
                  "5": [
                    "29"
                  ]
                },
                "questions": [
                  12,
                  13,
                  14
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
      },
      '2':{
        "groups": {
          "1": [
            {
              "id": "18",
              "question": "What kind of data you are processing?",
              "choices": "realtime|nonrealtime",
              "isActive": false
            }
          ],
          "2": [
            {
              "id": "23",
              "question": "Do you want to use Two-way Communication ?",
              "choices": "yes|no",
              "isActive": false
            }
          ],
          "3": [
            {
              "id": "15",
              "question": "Do you need file storage that is optimized for parallel analytics workloads and high throughput/IOPS",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "16",
              "question": "Do you need to store unstructured or semi-structured data in a schemaless database?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "17",
              "question": "Do you need managed, high speed, cloud-based storage for any type of data?",
              "choices": "yes|no",
              "isActive": false
            }
          ],
          "4": [
            {
              "id": "19",
              "question": "Do you want to use Machine Learning in your project?",
              "choices": "yes|no",
              "isActive": false
            }
          ],
          "5": [
            {
              "id": "20",
              "question": "Do you want to use Row Level security?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "21",
              "question": "Do you want to use memory caching? ",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "22",
              "question": "What kind of data you are processing?",
              "choices": "relational|nonrelational",
              "isActive": false
            }
          ],
          "6": [
            {
              "id": "12",
              "question": "Do you want to design your visualizations and reports while offline?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "13",
              "question": "Do you want to to embed dynamic visualizations in an external website or application?",
              "choices": "yes|no",
              "isActive": false
            },
            {
              "id": "14",
              "question": "Do you need to connect to numerous data sources?",
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
  },
  "12": {
    "30": "yes",
    "31": "no",
    "32": "yes"
  },
  "13": {
    "30": "yes",
    "31": "yes",
    "32": "no"
  },
  "14": {
    "30": "yes",
    "32": "no"
  },
  "15": {
    "20": "yes",
    "21": "yes"
  },
  "16": {
    "22": "yes"
  },
  "17": {
    "20": "yes",
    "21": "yes"
  },
  "18": {
    "12": "nonrealtime",
    "13": "realtime",
    "14": "realtime"
  },
  "19": {
    "23": "yes",
    "25": "yes",
    "26": "yes"
  },
  "20": {
    "18": "yes",
    "22": "no",
    "28": "yes"
  },
  "21": {
    "18": "yes",
    "28": "yes"
  },
  "22": {
    "28": "relational",
    "29": "relational"
  },
  "23": {
    "17": "yes"
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