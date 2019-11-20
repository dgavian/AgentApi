'use strict';

const AgentRepo = require('./agentRepo').AgentRepo;
const AgentService = require('./agentService').AgentService;
const Validator = require('./validationService').ValidationService;
const ResponseService = require('./responseService').ResponseService;
const CustomerRepo = require('./customerRepo').CustomerRepo;
const CustomerService = require('./customerService').CustomerService;

const ServiceFactory = function () {
    this.makeValidator = function () {
        return new Validator();
    };

    this.makeAgentRepo = function () {
        return new AgentRepo();
    };

    this.makeAgentService = function (validator, repo) {
        return new AgentService(validator, repo);
    };

    this.makeResponseService = function () {
        return new ResponseService();
    };

    this.makeCustomerRepo = function () {
        return new CustomerRepo();
    };

    this.makeCustomerService = function (validator, customerRepo, agentRepo) {
        return new CustomerService(validator, customerRepo, agentRepo);
    };
};

exports.ServiceFactory = ServiceFactory;