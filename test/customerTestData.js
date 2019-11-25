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

    this.makeAgentCustomers = function () {
        const agentCustomers = [{
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
        },
        {
            "_id": 8203,
            "agent_id": 467,
            "guid": "60e09079-3b7b-434a-9030-5f7f98eda232",
            "isActive": true,
            "balance": "$2,634.30",
            "age": 62,
            "eyeColor": "brown",
            "name": {
                "first": "Pope",
                "last": "Wheeler"
            },
            "company": "GEEKOLOGY",
            "email": "pope.wheeler@geekology.co.uk",
            "phone": "+1 (910) 453-2823",
            "address": "825 Cropsey Avenue, Homeworth, Puerto Rico, 7683",
            "registered": "Thursday, January 16, 2014 2:49 AM",
            "latitude": "59.528935",
            "longitude": "52.987053",
            "tags": [
                "cillum",
                "voluptate",
                "duis",
                "mollit",
                "ea"
            ]
        },
        {
            "_id": 4904,
            "agent_id": 321,
            "guid": "f5c1ffed-fd1a-450f-94a8-f2d0842de50c",
            "isActive": false,
            "balance": "$3,612.71",
            "age": 38,
            "eyeColor": "blue",
            "name": {
                "first": "Buchanan",
                "last": "Barr"
            },
            "company": "ZAPPIX",
            "email": "buchanan.barr@zappix.net",
            "phone": "+1 (932) 473-3214",
            "address": "410 Melrose Street, Chaparrito, Washington, 1367",
            "registered": "Thursday, February 11, 2016 12:17 PM",
            "latitude": "58.098824",
            "longitude": "130.811528",
            "tags": [
                "ad",
                "laboris",
                "consectetur",
                "nulla",
                "nulla"
            ]
        }];
    
        return agentCustomers;
    };
};

exports.CustomerTestData = CustomerTestData;