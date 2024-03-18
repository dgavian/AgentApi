'use strict';

const serviceFactory = require('../../service/serviceFactory').ServiceFactory,
    ServiceFactory = new serviceFactory(),
    Validator = ServiceFactory.makeValidator(),
    AgentRepo = ServiceFactory.makeAgentRepo(),
    AgentService = ServiceFactory.makeAgentService(Validator, AgentRepo),
    ResponseService = ServiceFactory.makeResponseService();

exports.getAllAgents = async function (req, res) {
    try {
        const agents = await AgentService.getAllAgents();
        res.status(200).json(agents);
    } catch (error) {
        const responseContent = ResponseService.getServerErrorResponse(res, error);
        res.json(responseContent);
    }
};

exports.addAgent = async function (req, res) {
    try {
        const requestBody = req.body;
        await AgentService.addAgent(requestBody);
        ResponseService.getCreatedResponse(req, requestBody._id, res);
        res.json(requestBody);
    } catch (error) {
        const responseContent = ResponseService.getErrorResponse(error, res);
        res.json(responseContent);
    }
};

exports.getAgent = async function (req, res) {
    try {
        const agentId = parseInt(req.params.agentId, 10);
        const agent = await AgentService.getAgentById(agentId);
        res.json(agent);
    } catch (error) {
        const responseContent = ResponseService.getErrorResponse(error, res);
        res.json(responseContent);
    }
};

exports.addOrUpdateAgent = async function (req, res) {
    try {
        const requestBody = req.body;
        const agentId = parseInt(req.params.agentId, 10);
        await AgentService.addOrUpdateAgent(agentId, requestBody)
        res.status(204).send();
    } catch (error) {
        const responseContent = ResponseService.getErrorResponse(error, res);
        res.json(responseContent);
    }
};