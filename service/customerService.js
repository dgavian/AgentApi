'use strict';

const uuidv4 = require('uuid/v4');

const errors = require('./errors');

const CustomerService = function (validator, customerRepo, agentRepo) {
    this.getAgentCustomers = async function (agentId) {
        const agentCustomers = await customerRepo.getAgentCustomers(agentId);
        if (!agentCustomers.length) {
            throw new errors.NotFoundError(`No customers found for agent with id ${agentId}`);
        }
        return agentCustomers;
    };

    this.addCustomer = async function (newCustomer, agentId) {
        if (!validator.isValidCustomer(newCustomer, agentId)) {
            throw new errors.InvalidResourceError('Invalid customer');
        }

        const agentExists = await agentRepo.agentExists(agentId);
        if (!agentExists) {
            throw new errors.UnprocessableError(`Cannot add customer to agent with id ${agentId}`)
        }

        const customerExists = await customerRepo.customerExists(newCustomer._id);
        if (customerExists) {
            throw new errors.ResourceConflictError(`Customer with id ${newCustomer._id} already exists`);
        }
        
        const guid = uuidv4();
        
        newCustomer.guid = guid;

        newCustomer.agent_id = agentId;

        await customerRepo.addCustomer(newCustomer);
    };

    this.removeCustomer = async function (customerId) {
        await customerRepo.removeCustomer(customerId);
    };
};

exports.CustomerService = CustomerService;