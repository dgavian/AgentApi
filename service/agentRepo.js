'use strict';

const fs = require('fs').promises,
    dataPath = 'data/',
    agentsPath = `${dataPath}agents.json`,
    customersPath = `${dataPath}customers.json`;

const AgentRepo = function () {
    this.getAllAgents = async function () {

        const result = await fs.readFile(agentsPath);

        const agents = JSON.parse(result);

        console.log(`Successfully read all agents: ${JSON.stringify(agents)}`);

        return agents;
    };
};

exports.AgentRepo = AgentRepo;