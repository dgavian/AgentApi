'use strict';

module.exports = function (app) {
    const agents = require('../controllers/agentController');

    app.route('/v1/agents')
        .get(agents.getAllAgents)
        .post(agents.addAgent);

    app.route('/v1/agents/:agentId')
        .get(agents.getAgent)
        .put(agents.updateAgent);
};