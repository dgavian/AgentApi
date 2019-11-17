'use strict';

const AgentRepo = require('./agentRepo').AgentRepo;

const ServiceFactory = function () {
    this.makeAgentRepo = function () {
        return new AgentRepo();
    }
};

exports.ServiceFactory = ServiceFactory;