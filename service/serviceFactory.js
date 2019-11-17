'use strict';

const fs = require('fs');

const AgentRepo = require('./agentRepo').AgentRepo;

const ServiceFactory = function () {
    this.makeAgentRepo = function () {
        return new AgentRepo(fs);
    }
};

exports.ServiceFactory = ServiceFactory;