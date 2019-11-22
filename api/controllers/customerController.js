'use strict';

const CustomerController = function (serviceFactory) {
    const Validator = serviceFactory.makeValidator(),
        CustomerRepo = serviceFactory.makeCustomerRepo(),
        AgentRepo = serviceFactory.makeAgentRepo(),
        CustomerService = serviceFactory.makeCustomerService(Validator, CustomerRepo, AgentRepo),
        ResponseService = serviceFactory.makeResponseService();

    this.getAgentCustomers = function (req, res) {
        const agentId = parseInt(req.params.agentId, 10);
        CustomerService.getAgentCustomers(agentId)
            .then(ac => res.json(ac))
            .catch(error => {
                const responseContent = ResponseService.getErrorResponse(error, res);
                res.json(responseContent);
            });
    };

    this.addCustomer = function (req, res) {
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

    this.removeCustomer = function (req, res) {
        const agentId = parseInt(req.params.agentId, 10);
        const customerId = parseInt(req.params.customerId, 10);

        CustomerService.removeCustomer(customerId, agentId)
            .then(() => res.status(204).end())
            .catch(error => {
                const responseContent = ResponseService.getServerErrorResponse(res, error);
                res.json(responseContent);
            });
    };

    this.addOrUpdateCustomer = function (req, res) {
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

    this.getCustomer = function (req, res) {
        const agentId = parseInt(req.params.agentId, 10);
        const customerId = parseInt(req.params.customerId, 10);

        CustomerService.getCustomer(customerId, agentId)
            .then(c => res.json(c))
            .catch(error => {
                const responseContent = ResponseService.getErrorResponse(error, res);
                res.json(responseContent);
            });
    };
};

exports.CustomerController = CustomerController;