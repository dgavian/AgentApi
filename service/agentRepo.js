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

    this.addAgent = async function (newAgent) {
        const agents = await this.getAllAgents();
        agents.push(newAgent);
        await fs.writeFile(agentsPath, JSON.stringify(agents, null, 4));
    };
};

exports.AgentRepo = AgentRepo;