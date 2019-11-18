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
        const agent = await repo.getAgent(agentId);
        if (!agent) {
            throw new errors.NotFoundError(`Agent with id ${agentId} not found`);
        }
        return agent;
    };

    this.addOrUpdateAgent = async function (agentId, agent) {
        if (!validator.isValidAgentForUpdate(agent, agentId)) {
            throw new errors.InvalidResourceError('Invalid agent');
        }
        agent._id = agentId;
        await repo.addOrUpdateAgent(agent);
    };
};

exports.AgentService = AgentService;