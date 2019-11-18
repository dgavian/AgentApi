'use strict';

const errors = require('./errors');

const AgentService = function (validator, repo) {

    const agentExists = async function (agentId) {
        const agent = await repo.getAgent(agentId);
        console.log(`Agent with id ${agentId}: ${JSON.stringify(agent)}`);  
        return !!agent;
    };

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
};

exports.AgentService = AgentService;