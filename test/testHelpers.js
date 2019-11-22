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
            }
        };
    };

    this.makeFakeRequest = function () {
        return {
            // TODO: Flesh out as needed.
        };
    };
};

exports.TestHelpers = TestHelpers;