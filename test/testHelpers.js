'use strict';

const TestHelpers = function () {
    this.makeFakeResponse = function () {
        return {
            statusCode: 200,
            locationHeader: '',
            status: function (value) {
                statusCode = value;
            },
            location: function (headerValue) {
                this.locationHeader = headerValue;
            },
            json: function (item) {
                return JSON.stringify(item);
            },
            end: function () {

            }
        };
    };

    this.makeFakeRequest = function () {
        return {
            params: {
                agentId: '42'
            }
        };
    };
};

exports.TestHelpers = TestHelpers;