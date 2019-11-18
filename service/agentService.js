'use strict';

const errors = require('./errors');

const AgentService = function (validator, repo) {

    const agentExists = async function (agentId) {
        const agent = await repo.getAgent(agentId); 
        return !!agent;
    };

    this.getAllAgents = async function () {
        return await repo.getAllAgents();
    }

    this.addAgent = async function (newAgent) {
        if (!validator.isValidAgent(newAgent)) {
            throw new errors.InvalidResourceError('Invalid agent');
        }

        const agentExistsResult = await agentExists(newAgent._id);
        if (agentExistsResult) {
            throw new errors.ResourceConflictError(`Agent with id ${newAgent._id} already exists`);
        }

        await repo.addAgent(newAgent);
    };

    this.getAgentById = async function (agentId) {
        agentId = parseInt(agentId, 10);
        const agent = await repo.getAgent(agentId);
        if (!agent) {
            throw new errors.NotFoundError(`Agent with id ${agentId} not found`);
        }
        return agent;
    };
};

exports.AgentService = AgentService;