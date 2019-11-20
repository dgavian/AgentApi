'use strict';

const errors = require('./errors');

const AgentService = function (validator, repo) {

    this.getAllAgents = async function () {
        return await repo.getAllAgents();
    };

    this.addAgent = async function (newAgent) {
        if (!validator.isValidAgent(newAgent)) {
            throw new errors.InvalidResourceError('Invalid agent');
        }

        const agentExists = await repo.agentExists(newAgent._id);
        if (agentExists) {
            throw new errors.ResourceConflictError(`Agent with id ${newAgent._id} already exists`);
        }

        await repo.addAgent(newAgent);
    };

    this.getAgentById = async function (agentId) {
        const agent = await repo.getAgent(agentId);
        if (!agent) {
            throw new errors.NotFoundError(`Agent with id ${agentId} not found`);
        }
        return agent;
    };

    this.addOrUpdateAgent = async function (agentId, agent) {
        agent._id = agentId;

        if (!validator.isValidAgent(agent)) {
            throw new errors.InvalidResourceError('Invalid agent');
        }

        const agentExists = await repo.agentExists(agentId);
        if (agentExists) {
            await repo.updateAgent(agent);
        } else {
            await repo.addAgent(agent);
        }
    };
};

exports.AgentService = AgentService;