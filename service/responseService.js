'use strict';

const errors = require('./errors');

const ResponseService = function () {
    this.getErrorResponse = function (err) {
        let result = {
            content: { message: err.message }
        };

        if (err instanceof (errors.InvalidResourceError)) {
            result.statusCode = 400;
        } else if (err instanceof (errors.ResourceConflictError)) {
            result.statusCode = 409;
        } else {
            result.statusCode = 500;
            result.content.message = 'Internal Server Error';
        }

        return result;
    };
};

exports.ResponseService = ResponseService;