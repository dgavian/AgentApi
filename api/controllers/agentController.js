'use strict';

const serviceFactory = require('../../service/serviceFactory').ServiceFactory,
    ServiceFactory = new serviceFactory(),
    AgentRepo = ServiceFactory.makeAgentRepo();

exports.getAllAgents = function (req, res) {
    AgentRepo.getAllAgents()
        .then(agents => res.json(agents));
        //.catch(error => );
};

exports.addAgent = function (req, res) {
    const requestBody = req.body;
    console.log(`Request: ${JSON.stringify(requestBody)}`);
    AgentRepo.addAgent(requestBody)
        .then(() => {
            res.location(`http://localhost:3000/v1/agents/${requestBody._id}`);
            res.status(201);
            res.json(requestBody);
        });
};