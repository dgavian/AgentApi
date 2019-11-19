'use strict';

const fs = require('fs').promises,
    dataPath = 'data/',
    customersPath = `${dataPath}customers.json`;

const CustomerRepo = function () {
    const getAllCustomers = async function () {
        const result = await fs.readFile(customersPath);

        const customers = JSON.parse(result);

        return customers;
    };

    this.getAgentCustomers = async function (agentId) {
        const allCustomers = await getAllCustomers();
        const result = allCustomers.filter(c => c.agent_id === agentId);
        return result;
    };

    this.addCustomer = async function (newCustomer) {
        const customers = await getAllCustomers();
        customers.push(newCustomer);
        await fs.writeFile(customersPath, JSON.stringify(customers, null, 4));
    };
};

exports.CustomerRepo = CustomerRepo;