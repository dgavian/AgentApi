'use strict';

const serviceFactory = require('../../service/serviceFactory').ServiceFactory,
    ServiceFactory = new serviceFactory(),
    Validator = ServiceFactory.makeValidator(),
    CustomerRepo = ServiceFactory.makeCustomerRepo(),
    AgentRepo = ServiceFactory.makeAgentRepo(),
    CustomerService = ServiceFactory.makeCustomerService(Validator, CustomerRepo, AgentRepo),
    ResponseService = ServiceFactory.makeResponseService();

exports.getAgentCustomers = function (req, res) {
    const agentId = parseInt(req.params.agentId, 10);
    CustomerService.getAgentCustomers(agentId)
        .then(ac => res.json(ac))
        .catch(error => {
            const responseContent = ResponseService.getErrorResponse(error, res);
            res.json(responseContent);
        });
};

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