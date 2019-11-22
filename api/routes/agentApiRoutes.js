'use strict';

module.exports = function (app) {
    const ServiceFactory = require('../../service/serviceFactory').ServiceFactory;
    const AgentController = require('../controllers/agentController').AgentController;
    const CustomerController = require('../controllers/customerController').CustomerController;
    
    const serviceFactory = new ServiceFactory();
    const agents = new AgentController(serviceFactory);
    const customers = new CustomerController(serviceFactory);

    app.route('/v1/agents')
        .get(agents.getAllAgents)
        .post(agents.addAgent);

    app.route('/v1/agents/:agentId')
        .get(agents.getAgent)
        .put(agents.addOrUpdateAgent);

    app.route('/v1/agents/:agentId/customers')
        .get(customers.getAgentCustomers)
        .post(customers.addCustomer);

    app.route('/v1/agents/:agentId/customers/:customerId')
        .get(customers.getCustomer)
        .put(customers.addOrUpdateCustomer)
        .delete(customers.removeCustomer);
};