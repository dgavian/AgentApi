'use strict';

const fs = require('fs').promises,
    dataPath = 'data/',
    customersPath = `${dataPath}customers.json`;

const CustomerRepo = function () {

    this.getAgentCustomers = async function (agentId) {
        const allCustomers = await getAllCustomers();
        const result = allCustomers.filter(c => c.agent_id === agentId);
        const agentCustomers = mapCustomers(result);
        return agentCustomers;
    };

    this.addCustomer = async function (newCustomer) {
        const customers = await getAllCustomers();
        customers.push(newCustomer);
        clearCache();
        await fs.writeFile(customersPath, JSON.stringify(customers, null, 4));
    };

    this.removeCustomer = async function (customerId) {
        console.log(`Attempting to remove customer with id ${customerId}`);
        const customers = await getAllCustomers();
        const index = customers.findIndex(c => c._id === customerId);
        if (index >= 0) {
            console.log(`Removing customer with id ${customerId}`);
            const removedItem = customers.splice(index, 1);
            clearCache();
            await fs.writeFile(customersPath, JSON.stringify(customers, null, 4));
        }
    };

    this.customerExists = async function (customerId) {
        const customers = await getAllCustomers();
        const foundCustomer = customers.find(c => c._id === customerId);
        return !!foundCustomer;
    };

    async function getAllCustomers () {
        if (!getAllCustomers.customerCache) {
            console.log('Getting customers from storage');
            const result = await fs.readFile(customersPath);
            const customers = JSON.parse(result);
            getAllCustomers.customerCache = customers;
        }
        return getAllCustomers.customerCache;
    };

    function mapCustomers(customers) {
        return customers.map(c => {
            let newObj = {
                id: c._id,
                firstName: c.name.first,
                lastName: c.name.last,
                address: c.address
            };
            return newObj;
        });
    };

    function clearCache() {
        getAllCustomers.customerCache = null;
    };
};

exports.CustomerRepo = CustomerRepo;