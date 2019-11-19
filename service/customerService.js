'use strict';

const errors = require('./errors');

const CustomerService = function (validator, customerRepo, agentRepo) {
    this.getAgentCustomers = async function (agentId) {
        const agentCustomers = await customerRepo.getAgentCustomers(agentId);
        if (!agentCustomers.length) {
            throw new errors.NotFoundError(`No customers found for agent with id ${agentId}`);
        }
        const mapped = mapCustomers(agentCustomers);
        return mapped;
    };

    this.addCustomer = async function (newCustomer, agentId) {
        if (!validator.isValidCustomer(newCustomer, agentId)) {
            throw new errors.InvalidResourceError('Invalid customer');
        }

        const agentExistsResult = await agentRepo.agentExists(agentId);
        if (!agentExistsResult) {
            throw new errors.UnprocessableError(`Cannot add customer to agent with id ${agentId}`)
        }

        newCustomer.agent_id = agentId;

        // TODO: Assign guid

        await customerRepo.addCustomer(newCustomer);
    };

    function mapCustomers(customers) {
        return customers.map(c => {
            let newObj = {
                firstName: c.name.first,
                lastName: c.name.last,
                address: c.address
            };
            return newObj;
        });
    };
};

exports.CustomerService = CustomerService;