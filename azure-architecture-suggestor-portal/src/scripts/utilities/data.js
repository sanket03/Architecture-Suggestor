const architectureDetails = {
    '1' : {
        "name": "architecture 1",
        "groups": {
          "1": {
            "name": "group 1",
            "isActive": false,
            "relatedGroups": {
              "3": "con1",
              "2": "con2"
            },
            "entities": {
              "1": {
                "name": "entity1",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  1
                ],
                "filteredBy": ""
              },
              "2": {
                "name": "entity2",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  2
                ],
                "filteredBy": ""
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
                "isActive": true,
                "parentEntities": {
                    "1": ["1"] 
                },
                "questions": [
                  3
                ],
                "filteredBy": ""
              },
              "4": {
                "name": "entity4",
                "isActive": true,
                "parentEntities": {
                    "1": ["2"]   
                },
                "questions": [
                  4
                ],
                "filteredBy": ""
              },
              "12": {
                "name": "entity12",
                "isActive": true,
                "parentEntities": {
                },
                "questions": [
                ],
                "filteredBy": ""
              },
              "13": {
                "name": "entity13",
                "isActive": true,
                "parentEntities": {
                },
                "questions": [
                ],
                "filteredBy": ""
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
                "isActive": true,
                "parentEntities": {
                    "1": ["1"]
                },
                "questions": [
                  5
                ],
                "filteredBy": ""
              },
              "6": {
                "name": "entity6",
                "isActive": true,
                "parentEntities": {
                    "1": ["2"]   
                },
                "questions": [
                  6
                ],
                "filteredBy": ""
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
                "isActive": true,
                "parentEntities": {
                    "3": ["5"]   
                },
                "questions": [
                  7
                ],
                "filteredBy": ""
              },
              "8": {
                "name": "entity8",
                "isActive": true,
                "parentEntities": {
                    "3": ["5","6"]   
                },
                "questions": [
                  8
                ],
                "filteredBy": ""
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
                "isActive": true,
                "parentEntities": {
                    "4": ["7"]   
                },
                "questions": [
                  9
                ],
                "filteredBy": ""
              },
              "10": {
                "name": "entity10",
                "isActive": true,
                "parentEntities": {
                    "4": ["8"]   
                },
                "questions": [
                  10
                ],
                "filteredBy": ""
              },
              "11": {
                "name": "entity11",
                "isActive": true,
                "parentEntities": {
                    "4": ["7","8"]   
                },
                "questions": [
                  10,
                  11
                ],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
              },
              "13": {
                "name": "Sensors & IoT",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  18
                ],
                "filteredBy": ""
              },
              "14": {
                "name": "Events & Streams",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  18
                ],
                "filteredBy": ""
              },
              "15": {
                "name": "Business Apps(Structured Data)",
                "isActive": true,
                "parentEntities": {},
                "questions": [],
                "filteredBy": ""
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
                "questions": [],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                "questions": [],
                "filteredBy": ""
              },
              "19": {
                "name": "Event Hub",
                "isActive": true,
                "parentEntities": {
                  "1": [
                    "14"
                  ]
                },
                "questions": [],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                  16
                ],
                "filteredBy": ""
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
                "questions": [],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
              },
              "24": {
                "name": "Stream Analytics",
                "isActive": true,
                "parentEntities": {
                  "3": [
                    "20"
                  ]
                },
                "questions": [],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                "questions": [],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                  20
                ],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
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
                ],
                "filteredBy": ""
              }
            }
          }
        }
      },
      '3':{
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
                "name": "Logs & Files.PNG",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  18
                ],
                "filteredBy": "",
                "url": 'Logs & Files.PNG'
              },
              "13": {
                "name": "Sensors & IoT",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  18
                ],
                "filteredBy": "",
                "url": "Sensors & IoT.PNG"
              },
              "14": {
                "name": "Events & Streams",
                "isActive": true,
                "parentEntities": {},
                "questions": [
                  18
                ],
                "filteredBy": "",
                "url": "Stream Analytics"
              },
              "15": {
                "name": "Business Apps(Structured Data)",
                "isActive": true,
                "parentEntities": {},
                "questions": [],
                "filteredBy": "WebApps"
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
                "questions": [],
                "filteredBy": "",
                "url": "Azure Data Factory"
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
                ],
                "filteredBy": "",
                "url": "IoT Hub.png"
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
                "questions": [],
                "filteredBy": "",
                "url": "Azure HD Insights.png"
              },
              "19": {
                "name": "Event Hub",
                "isActive": true,
                "parentEntities": {
                  "1": [
                    "14"
                  ]
                },
                "questions": [],
                "filteredBy": "",
                "url": "Event Hub"
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
                  15
                ],
                "filteredBy": "",
                "url": "Azure Blob Storage"
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
                  15
                ],
                "filteredBy": "",
                "url": "Azure Data Lake Analytics.png"
              },
              "22": {
                "name": "Azure CosmosDB",
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
                ],
                "filteredBy": "",
                "url": "Azure CosmosDB"
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
                    "21",
                    "22"
                  ]
                },
                "questions": [],
                "filteredBy": "",
                "url": "Azure HD Insights.png"
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
                ],
                "filteredBy": "",
                "url": "Azure Machine Learning"
              },
              "24": {
                "name": "Stream Analytics",
                "isActive": true,
                "parentEntities": {
                  "3": [
                    "20"
                  ]
                },
                "questions": [],
                "filteredBy": "",
                "url": "Stream Analytics"
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
                ],
                "filteredBy": "",
                "url": "Azure Data Bricks.png"
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
                ],
                "filteredBy": "",
                "url": "Azure Functions.png"
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
                "questions": [],
                "filteredBy": "",
                "url": "Azure Data Lake Analytics.png"
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
                  20
                ],
                "filteredBy": "",
                "url": "Azure HD Insights.png"
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
                  20
                ],
                "filteredBy": "",
                "url": "Azure CosmosDB"
              },
              "28": {
                "name": "Azure SQL DB",
                "isActive": true,
                "parentEntities": {
                  "4": [
                    "23",
                    "24",
                    "18",
                    "25"
                  ]
                },
                "questions": [
                  20
                ],
                "filteredBy": "",
                "url": "Azure SQL DB"
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
                ],
                "filteredBy": "",
                "url": "Azure DW"
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
                  12
                ],
                "filteredBy": "",
                "url": "PowerBI.jpg"
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
                  12
                ],
                "filteredBy": "",
                "url": "WebApps"
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
                  12
                ],
                "filteredBy": "",
                "url": "Microsoft Excel"
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
      },
      '3':{
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
            }
          ],
          "6": [
            {
              "id": "12",
              "question": "Do you wish to design reports using built in visuals with minimal coding?",
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
    "1":"architecture 1",
    '3':'Data Warehouse'
}

export {
    architectureDetails,
    solutionsList,
    questionEntityMapping,
    questionDetails
}