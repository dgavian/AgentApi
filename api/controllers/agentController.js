'use strict';

const serviceFactory = require('../../service/serviceFactory').ServiceFactory,
    ServiceFactory = new serviceFactory(),
    AgentRepo = ServiceFactory.makeAgentRepo();

exports.getAllAgents = function (req, res) {
    AgentRepo.getAllAgents()
        .then(agents => res.json(agents));
        //.catch(error => );
};