'use strict';

const TestHelpers = function () {
    this.makeFakeResponse = function () {
        const FakeResponse = {
            status: function (value) {
                
            },
            json: function (item) {
                
            },
            end: function () {

            }
        };

        return FakeResponse;
    };

    this.makeFakeRequest = function () {
        return {
            params: {
                agentId: '42',
                customerId: '420'
            }
        };
    };
};

exports.TestHelpers = TestHelpers;