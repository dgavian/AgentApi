'use strict';

const url = require('url'),
    serviceFactory = require('../../service/serviceFactory').ServiceFactory,
    ServiceFactory = new serviceFactory(),
    Validator = ServiceFactory.makeValidator(),
    AgentRepo = ServiceFactory.makeAgentRepo(),
    AgentService = ServiceFactory.makeAgentService(Validator, AgentRepo),
    ResponseService = ServiceFactory.makeResponseService(),
    getLocationHeader = function (req, newId) {
        let reqUrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl,
        });

        return `${reqUrl}/${newId}`;
    };

exports.getAllAgents = function (req, res) {
    AgentRepo.getAllAgents()
        .then(agents => res.json(agents))
        .catch(error => res.send(error));   // TODO: Fix for 500.
};

exports.addAgent = function (req, res) {
    const requestBody = req.body;
    console.log(`Request: ${JSON.stringify(requestBody)}`);
    AgentService.addAgent(requestBody)
        .then(() => {
            const locationHeader = getLocationHeader(req, requestBody._id);
            res.location(locationHeader);
            res.status(201);
            res.json(requestBody);
        })
        .catch(error => {
            const errorResponseData = ResponseService.getErrorResponse(error);
            res.status(errorResponseData.statusCode);
            res.json(errorResponseData.content);
        });
};