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
            const responseContent = ResponseService.getServerErrorResponse(res);
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
    const agentId = req.params.agentId;
    AgentService.getAgentById(agentId)
        .then(a => res.json(a))
        .catch(error => {
            const responseContent = ResponseService.getErrorResponse(error, res);
            res.json(responseContent);
        });
};

exports.updateAgent = function (req, res) {

};