'use strict';

const errors = require('./errors');

// TODO: Add unit tests.

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
            throw new errors.UnprocessableError(`Cannot add customer to agent id ${agentId}`)
        }

        const customerExists = await customerRepo.customerExists(newCustomer._id);
        if (customerExists) {
            throw new errors.ResourceConflictError(`Customer with id ${newCustomer._id} already exists`);
        }

        newCustomer.agent_id = agentId;

        await customerRepo.addCustomer(newCustomer);
    };

    this.removeCustomer = async function (customerId, agentId) {
        await customerRepo.removeCustomer(customerId, agentId);
    };

    this.addOrUpdateCustomer = async function (customer, customerId, agentId) {
        customer._id = customerId;

        const agentExists = await agentRepo.agentExists(agentId);
        if (!agentExists) {
            throw new errors.UnprocessableError(`Cannot update customer wih agent id ${agentId}`)
        }

        if (!validator.isValidCustomer(customer, agentId)) {
            throw new errors.InvalidResourceError('Invalid customer');
        }

        customer.agent_id = agentId;

        const customerExists = await customerRepo.customerExists(customerId);

        if (customerExists) {
            await customerRepo.updateCustomer(customer);
        } else {
            await customerRepo.addCustomer(customer);
        }
    };

    this.getCustomer = async function(customerId, agentId) {
        const customer = await customerRepo.getCustomer(customerId, agentId);
        if (!customer) {
            throw new errors.NotFoundError(`Customer with id ${customerId} not found`);
        }
        return customer;
    };
};

exports.CustomerService = CustomerService;