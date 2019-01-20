const architectureDetails = {
'11' : {
  "name": "Big Data Solution",
  "groups": {
    "1": {
      "name": "Data Sources",
      "isActive": false,
      "relatedGroups": {
        "2": {
          "connector": null,
          "shouldConn": true
        },
        "3": {
          "connector": null,
          "shouldConn": false
        }
      },
      "entities": {
        "101": {
          "name": "Logs & Files",
          "isActive": true,
          "parentEntities": {},
          "questions": [
            "1001"
          ],
          "filteredBy": ""
        },
        "102": {
          "name": "Events & Streams",
          "isActive": true,
          "parentEntities": {},
          "questions": [
            "1001"
          ],
          "filteredBy": ""
        }
      }
    },
    "2": {
      "name": "Connector",
      "isActive": false,
      "relatedGroups": {
        "3":{
          "connector": null,
          "shouldConn": true
        }
      },
      "entities": {
        "103": {
          "name": "On Premise Gateway",
          "isActive": true,
          "parentEntities": {
            "1": ["101", "102"]
          },
          "questions": [
            "1002"
          ],
          "filteredBy": "",
          "url": "Azure Application Gateway.png"
        }
      }
    },
    "3" : {
      "name": "Ingestion",
      "isActive": false,
      "relatedGroups": {
        "8": {
          "connector": null,
          "shouldConn": true
        },
        "4": {
          "connector": null,
          "shouldConn": false
        }
      },
      "entities": {
        "104": {
          "name": "IoT Hub",
          "isActive": true,
          "parentEntities": {
            "1": ["102"]
          },
          "questions": [
            "1003",
            "1004"
          ],
          "filteredBy": "",
          "url": 'Azure IoT Hub.png'
        },
        "105": {
          "name": "Event Hub",
          "isActive": true,
          "parentEntities": {
            "1": ["102"]
          },
          "questions": [
            "1003",
            "1004",
            "1005"
          ],
          "filteredBy": "",
          "url": "Azure Event Hubs.png"
        },
        "106": {
          "name": "Blob Storage",
          "isActive": true,
          "parentEntities": {
            "1": ["102"]
          },
          "questions": [
            "1003",
            "1004",
            "1005"
          ],
          "filteredBy": "",
          "url": "Azure Storage - Blob.png"
        },
        "107": {
          "name": "Azure Data factory",
          "isActive": true,
          "parentEntities": {

            "1": ["101"]
          },
          "questions": [
            "1003"
          ],
          "filteredBy": "",
          "url": "Azure Data Factory.png"
        }
      }
    },
    "8":{
      "name": "Stream Analytics",
      "isActive": false,
      "relatedGroups": {
        "7": {
          "connector": null,
          "shouldConn": true
        },
        "4": {
          "connector": null,
          "shouldConn": true
        },
        "9": {
          "connector": null,
          "shouldConn": true
        },
        "11": {
          "connector": null,
          "shouldConn": true
        }
      },
      "entities": {
        "114": {
          "name": "Stream Analytics",
          "isActive": true,
          "parentEntities": {
            "3": ["104","105","106"],
          },
          "questions": [
          ],
          "filteredBy": "",
          "url": "Azure Stream Analytics.png"
        }
      }
    },
    "4" : {
      "name": "Storage",
      "isActive": false,
      "relatedGroups": {
        "5": {
          "connector": null,
          "shouldConn": true
        },
        "7": {
          "connector": null,
          "shouldConn": false
        }
      },
      "entities": {
        "106": {
          "name": "Blob Storage",
          "isActive": true,
          "parentEntities": {
            "3": ["107"],
            "8": ["114"]
          },
          "questions": [
            "1006",
          ],
          "filteredBy": "",
          "url": "Azure Storage - Blob.png"
        },
        "108": {
          "name": "SQL DB",
          "isActive": true,
          "parentEntities": {
            "3": ["107"],
            "8": ["114"]
          },
          "questions": [
            "1006",
            "1007"
          ],
          "filteredBy": "",
          "url": "Azure SQL Database (generic).png"
        },
        "109": {
          "name": "SQL DataWarehouse",
          "isActive": true,
          "parentEntities": {
            "3": ["107"],
            "8": ["114"]
          },
          "questions": [
            "1006",
            "1007"
          ],
          "filteredBy": "",
          "URL": "Azure SQL DataWarehouse.png"
        },
        "110": {
          "name": "Data Lake Store",
          "isActive": true,
          "parentEntities": {
            "3": ["107"],
            "8": ["114"]
          },
          "questions": [
            "1006",
            "1007"
          ],
          "filteredBy": "",
          "url": "Azure Data Lake Store.png"
        },
        "111": {
          "name": "Cosmos DB",
          "isActive": true,
          "parentEntities": {
            "3": ["107"],
            "8": ["114"]
          },
          "questions": [
            "1006"
          ],
          "filteredBy": "",
          "url": "cosmosDB.png"
        },
        "112": {
          "name": "Azure Data Bricks",
          "isActive": true,
          "parentEntities": {
            "3": ["107"],
            "8": ["114"]
          },
          "questions": [
            "1008"
          ],
          "filteredBy": "",
          "url": "Azure Data Bricks.png"
        },
        "113": {
          "name": "Cognitive Services",
          "isActive": true,
          "parentEntities": {
            "3": ["107"],
            "8": ["114"]
          },
          "questions": [
            "1009"
          ],
          "filteredBy": "",
          "url": "Azure Cognitive Services.png"
        }
      }
    },
    "5" : {
      "name": "ADLA",
      "isActive": false,
      "relatedGroups": {
        "6":{
          "connector": null,
          "shouldConn": true
        },
        "7": {
          "connector": null,
          "shouldConn": false
        }
      },
      "entities": {
        "115": {
          "name": "ADLA",
          "isActive": true,
          "parentEntities": {
            "4": ["110"],
          },
          "questions": [
          ],
          "filteredBy": "",
          "url": "Azure Data Lake Analytics.png"
        } 
      }
    },
    "6" : {
      "name": "Analysis services",
      "isActive": false,
      "relatedGroups": {
        "7": {
          "connector": null,
          "shouldConn": true
        }
      },
      "entities": {
        "116": {
          "name": "Analysis Services",
          "isActive": true,
          "parentEntities": {
            "5": ["115"],
          },
          "questions": [
            "1010"
          ],
          "filteredBy": "",
          "url": "Analysis Service.png"
        },
        "117": {
          "name": "Data Warehouse",
          "isActive": true,
          "parentEntities": {
            "5": ["115"],
          },
          "questions": [
            "1010"
          ],
          "filteredBy": "",
          "url": "Azure Data Warehouse.png"
        }
      }
    },
    "7" : {
      "name": "Power BI",
      "isActive": false,
      "relatedGroups": {
      },
      "entities": {
        "118": {
          "name": "Power BI",
          "isActive": true,
          "parentEntities": {
            "6": ["116", "117"],
            "5": ["115"],
            "8": ["114"],
            "4": ["108","109","110","111","106"]
          },
          "questions": [
          ],
          "filteredBy": "",
          "url": "Power BI Embedded.png"
        }
    }
    }
}
}

}

const questionDetails = {
'11': {
  "groups": {
    "1": {
      '1001': {
        "question": "What is the source for your system?",
        "choices": "Logs & Files|Events & Streams",
        "isActive": false,
        "multiple": true
      }
    },
    "2": {
      '1002': {
          "question": "Are any of the Data sources are On-Premise?",
          "choices": "Yes|No",
          "isActive": false,
          "multiple": false
        }
      },
    "3": {
      "1003": {
        "question": "Do you want to process data real time with latency less than one minute?",
        "choices": "Yes|No",
        "isActive": false,
        "multiple": false
      },
      "1004": {
        "question": "Are you using any IOT devices?",
        "choices": "Yes|No",
        "isActive": false,
        "multiple": false
      },
      "1005": {
        "question": "Is your data unstructured?",
        "choices": "Yes|No",
        "isActive": false,
        "multiple": false   
      }
    },
    "4":{
      "1006": {
        "question": "Do you have unstructured data?",
        "choices": "Yes|No",
        "isActive": false,
        "multiple": false
      },
      "1007": {
        "question": "What is the data size you are storing?",
        "choices": "Up to 250 GB|More than 250 GB|Up to 1 TB",
        "isActive": false,
        "multiple": false
      },
      "1008": {
        "question": "Are you using data for large scale processing or Analytics?",
        "choices": "Yes|No",
        "isActive": false,
        "multiple": false
      },
      "1009": {
        "question": "Are you planning to use pre-build models for processing of the data?",
        "choices": "Yes|No",
        "isActive": false,
        "multiple": false
      }
    },
    "6": {
      "1010": {
        "question": "Do we want to store data for downstream purpose?",
        "choices": "Yes|No",
        "isActive": false,
        "multiple": false
      }
    },
    "5": {
    },
    "7": {
    },
    "8": {
    },

    }
}
}

const questionEntityMapping = {
  "11" : {
    "1001": {
      "101": "Logs & Files",
      "102": "Events & Streams"
    },
    "1002": {
      "103": "Yes"
    },
    "1003": {
      "104": "Yes",
      "105": "Yes",
      "106": "Yes",
      "107": "No"
    },
    "1004": {
      "104": "Yes",
      "105": "No",
      "106": "No",
    },
    "1005": {
      "105": "No",
      "106": "Yes",
    },
    "1006": {
      "106": "Yes",
      "108": "No",
      "109": "No",
      "110": "No",
      "111": "Yes",
    },
    "1007": {
      "108": "Up to 250 GB",
      "109": "More than 250 GB",
      "110": "Up to 1 TB",
    },
    "1008": {
      "112": "Yes"
    },
    "1009": {
      "113": "Yes"
    },
    "1010": {
      "116": "Yes",
      "117": "Yes"
    }
  }
}

const solutionsList = {
  '11': 'Test'
}

module.exports =  {
  architectureDetails,
  solutionsList,
  questionEntityMapping,
  questionDetails
}