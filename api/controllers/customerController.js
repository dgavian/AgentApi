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

// TODO: "Modernize" the rest of these controller methods.
exports.addCustomer = function (req, res) {
    const requestBody = req.body;
    const agentId = parseInt(req.params.agentId, 10);

    CustomerService.addCustomer(requestBody, agentId)
        .then(() => {
            ResponseService.getCreatedResponse(req, requestBody._id, res);
            res.json(requestBody);
        })
        .catch(error => {
            const responseContent = ResponseService.getErrorResponse(error, res);
            res.json(responseContent);
        });
};

exports.removeCustomer = function (req, res) {
    const agentId = parseInt(req.params.agentId, 10);
    const customerId = parseInt(req.params.customerId, 10);

    CustomerService.removeCustomer(customerId, agentId)
        .then(() => res.status(204).end())
        .catch(error => {
            const responseContent = ResponseService.getServerErrorResponse(res, error);
            res.json(responseContent);
        });
};

exports.addOrUpdateCustomer = function (req, res) {
    const requestBody = req.body;
    const agentId = parseInt(req.params.agentId, 10);
    const customerId = parseInt(req.params.customerId, 10);

    CustomerService.addOrUpdateCustomer(requestBody, customerId, agentId)
        .then(() => res.status(200).end())
        .catch(error => {
            const responseContent = ResponseService.getErrorResponse(error, res);
            res.json(responseContent);
        });
};

exports.getCustomer = function (req, res) {
    const agentId = parseInt(req.params.agentId, 10);
    const customerId = parseInt(req.params.customerId, 10);

    CustomerService.getCustomer(customerId, agentId)
        .then(c => res.json(c))
        .catch(error => {
            const responseContent = ResponseService.getErrorResponse(error, res);
            res.json(responseContent);
        });
};