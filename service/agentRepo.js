'use strict';

const fs = require('fs').promises,
    dataPath = 'data/',
    agentsPath = `${dataPath}agents.json`,
    customersPath = `${dataPath}customers.json`;

const AgentRepo = function () {
    this.getAllAgents = async function () {

        const result = await fs.readFile(agentsPath);

        const agents = JSON.parse(result);

        return agents;
    };

    this.addAgent = async function (newAgent) {
        const agents = await this.getAllAgents();
        agents.push(newAgent);
        await fs.writeFile(agentsPath, JSON.stringify(agents, null, 4));
    };

    this.getAgent = async function (agentId) {
        const agents = await this.getAllAgents();
        const result = agents.find(a => a._id === agentId);
        return result;
    }

    this.addOrUpdateAgent = async function (agent) {
        const agents = await this.getAllAgents();
        let existingAgent = agents.find(a => a._id === agent._id);
        if (!existingAgent) {
            agents.push(agent);
        } else {
            for (let [key, value] of Object.entries(agent)) {
                existingAgent[key] = value;
            }
        }

        await fs.writeFile(agentsPath, JSON.stringify(agents, null, 4));
    }
};

exports.AgentRepo = AgentRepo;