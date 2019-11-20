'use strict';

const AgentTestData = function () {
    this.makeValidAgent = function () {
        return {
            _id: 101,
            name: "John Doe",
            address: "123 Main Street #200",
            city: "Seattle",
            state: "WA",
            zipCode: "98101",
            tier: 2,
            phone: {
                primary: "206-221-2345",
                mobile: "206-555-3211"
            }
        };
    };
};

exports.AgentTestData = AgentTestData;