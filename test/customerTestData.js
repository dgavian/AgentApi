'use strict';

const CustomerTestData = function () {
    this.makeValidCustomer = function () {
        return {
            "_id": 5054,
            "agent_id": 1987,
            "guid": "54fc8606-0630-42f9-9e3c-716772df09bf",
            "isActive": true,
            "balance": "$1,578.40",
            "age": 57,
            "eyeColor": "blue",
            "name": {
                "first": "Neva",
                "last": "Calderon"
            },
            "company": "ISOTRONIC",
            "email": "neva.calderon@isotronic.info",
            "phone": "+1 (985) 502-2956",
            "address": "573 Turner Place, Yukon, Federated States Of Micronesia, 762",
            "registered": "Wednesday, January 31, 2018 12:40 PM",
            "latitude": "76.989498",
            "longitude": "26.410977",
            "tags": [
                "eiusmod",
                "reprehenderit",
                "labore",
                "ut",
                "dolor"
            ]
        };
    };
};

exports.CustomerTestData = CustomerTestData;