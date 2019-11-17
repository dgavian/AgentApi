'use strict';

const serviceFactory = require('../../service/serviceFactory').ServiceFactory,
    ServiceFactory = new serviceFactory(),
    AgentRepo = ServiceFactory.makeAgentRepo();

exports.getAllAgents = function (req, res) {
    const agents = AgentRepo.getAllAgents();
    res.json(agents);
};