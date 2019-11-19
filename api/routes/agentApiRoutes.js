'use strict';

module.exports = function (app) {
    const agents = require('../controllers/agentController');
    const customers = require('../controllers/customerController');

    app.route('/v1/agents')
        .get(agents.getAllAgents)
        .post(agents.addAgent);

    app.route('/v1/agents/:agentId')
        .get(agents.getAgent)
        .put(agents.addOrUpdateAgent);

    app.route('/v1/agents/:agentId/customers')
        .get(customers.getAgentCustomers)
        .post(customers.addCustomer);

    app.route('/v1/customers/:customerId')
        .delete(customers.removeCustomer);
};