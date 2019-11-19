'use strict';

const serviceFactory = require('../../service/serviceFactory').ServiceFactory,
    ServiceFactory = new serviceFactory(),
    Validator = ServiceFactory.makeValidator(),
    AgentRepo = ServiceFactory.makeAgentRepo(),
    AgentService = ServiceFactory.makeAgentService(Validator, AgentRepo),
    ResponseService = ServiceFactory.makeResponseService();

exports.getAllAgents = function (req, res) {
    AgentService.getAllAgents()
        .then(agents => res.json(agents))
        .catch(error => {
            const responseContent = ResponseService.getServerErrorResponse(res, error);
            res.json(responseContent);
        });
};

exports.addAgent = function (req, res) {
    const requestBody = req.body;
    
    AgentService.addAgent(requestBody)
        .then(() => {
            ResponseService.getCreatedResponse(req, requestBody._id, res);
            res.json(requestBody);
        })
        .catch(error => {
            const responseContent = ResponseService.getErrorResponse(error, res);
            res.json(responseContent);
        });
};

exports.getAgent = function (req, res) {
    const agentId = parseInt(req.params.agentId, 10);
    AgentService.getAgentById(agentId)
        .then(a => res.json(a))
        .catch(error => {
            const responseContent = ResponseService.getErrorResponse(error, res);
            res.json(responseContent);
        });
};

exports.addOrUpdateAgent = function (req, res) {
    const requestBody = req.body;
    const agentId = parseInt(req.params.agentId, 10);
    AgentService.addOrUpdateAgent(agentId, requestBody)
        .then(() => res.status(200).end())
        .catch(error => {
            const responseContent = ResponseService.getErrorResponse(error, res);
            res.json(responseContent);           
        });
};