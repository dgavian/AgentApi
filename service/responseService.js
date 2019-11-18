'use strict';

const url = require('url');

const errors = require('./errors');

const ResponseService = function () {
    this.getErrorResponse = function (err, res) {
        let result = { message: err.message };

        if (err instanceof (errors.InvalidResourceError)) {
            res.status(400);
            return result;
        } else if (err instanceof (errors.ResourceConflictError)) {
            res.status(409);
            return result;
        } else if (err instanceof (errors.NotFoundError)) {
            res.status(404);
            return result;
        } else {
            return this.getServerErrorResponse(res);
        }
    };

    this.getServerErrorResponse = function (res) {
        res.status(500);
        return { message: 'Internal Server Error' };
    }

    this.getCreatedResponse = function (req, newId, res) {
        const locationHeader = getLocationHeader(req, newId);
        res.location(locationHeader);
        res.status(201);
    };

    function getLocationHeader(req, newId) {
        const reqUrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl,
        });

        return `${reqUrl}/${newId}`;
    };
};

exports.ResponseService = ResponseService;