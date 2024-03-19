'use strict';

const serviceFactory = require('../../service/serviceFactory').ServiceFactory,
    ServiceFactory = new serviceFactory(),
    Validator = ServiceFactory.makeValidator(),
    CustomerRepo = ServiceFactory.makeCustomerRepo(),
    AgentRepo = ServiceFactory.makeAgentRepo(),
    CustomerService = ServiceFactory.makeCustomerService(Validator, CustomerRepo, AgentRepo),
    ResponseService = ServiceFactory.makeResponseService();

exports.getAgentCustomers = async function (req, res) {
    try {
        const agentId = parseInt(req.params.agentId, 10);
        const agentCustomers = await CustomerService.getAgentCustomers(agentId);
        res.json(agentCustomers);
    } catch (error) {
        const responseContent = ResponseService.getErrorResponse(error, res);
        res.json(responseContent);
    }
};

exports.addCustomer = async function (req, res) {
    try {
        const requestBody = req.body;
        const agentId = parseInt(req.params.agentId, 10);
        await CustomerService.addCustomer(requestBody, agentId);
        ResponseService.getCreatedResponse(req, requestBody._id, res);
        res.json(requestBody);
    } catch (error) {
        const responseContent = ResponseService.getErrorResponse(error, res);
        res.json(responseContent);
    }
};

exports.removeCustomer = async function (req, res) {
    try {
        const agentId = parseInt(req.params.agentId, 10);
        const customerId = parseInt(req.params.customerId, 10);
        await CustomerService.removeCustomer(customerId, agentId);
        res.status(204).send();
    } catch (error) {
        const responseContent = ResponseService.getServerErrorResponse(res, error);
        res.json(responseContent);
    }
};

exports.addOrUpdateCustomer = async function (req, res) {
    try {
        const requestBody = req.body;
        const agentId = parseInt(req.params.agentId, 10);
        const customerId = parseInt(req.params.customerId, 10);
        await CustomerService.addOrUpdateCustomer(requestBody, customerId, agentId);
        res.status(204).send();
    } catch (error) {
        const responseContent = ResponseService.getErrorResponse(error, res);
        res.json(responseContent);
    }
};

exports.getCustomer = async function (req, res) {
    try {
        const agentId = parseInt(req.params.agentId, 10);
        const customerId = parseInt(req.params.customerId, 10);
        const customer = await CustomerService.getCustomer(customerId, agentId);
        res.json(customer);
    } catch (error) {
        const responseContent = ResponseService.getErrorResponse(error, res);
        res.json(responseContent);
    }
};