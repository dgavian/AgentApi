'use strict';

const fs = require('fs').promises,
    dataPath = 'data/',
    agentsPath = `${dataPath}agents.json`;

const AgentRepo = function () {
    this.getAllAgents = async function () {
        const allAgents = await getAgents();
        return allAgents;
    };

    this.addAgent = async function (newAgent) {
        const agents = await this.getAllAgents();
        agents.push(newAgent);
        clearCache();
        await fs.writeFile(agentsPath, JSON.stringify(agents, null, 4));
    };

    this.getAgent = async function (agentId) {
        const agents = await this.getAllAgents();
        const result = agents.find(a => a._id === agentId);
        return result;
    };

    this.updateAgent = async function (agent) {
        const agents = await this.getAllAgents();
        const agentIndex = agents.findIndex(a => a._id === agent._id);
        agents[agentIndex] = agent;
        clearCache();
        await fs.writeFile(agentsPath, JSON.stringify(agents, null, 4));
    };

    this.agentExists = async function (agentId) {
        const agent = await this.getAgent(agentId);
        return !!agent;
    };

    async function getAgents() {
        if (!getAgents.agentCache) {
            console.log('Getting agents from storage');
            const result = await fs.readFile(agentsPath);
            const agents = JSON.parse(result);
            getAgents.agentCache = agents;
        }
        return getAgents.agentCache;
    }

    function clearCache() {
        getAgents.agentCache = null;
    }
};

exports.AgentRepo = AgentRepo;