'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../service/agentService').AgentService;
const Validator = require('../service/validationService').ValidationService;
const Repo = require('../service/agentRepo').AgentRepo;

describe('Agent service', function () {
    let sut,
        validator,
        repo,
        agentExistsStub,
        addAgentStub,
        getAgentStub;

    this.beforeEach(function () {
        repo = new Repo();
        validator = new Validator();
        agentExistsStub = sinon.stub(repo, 'agentExists');
        addAgentStub = sinon.stub(repo, 'addAgent');
        sut = new Sut(validator, repo);        
    });

    it('addAgent should throw for invalid agent', async function () {
        const newAgent = makeAgentWithMissingName();
        await assert.rejects(() => sut.addAgent(newAgent), { name: 'InvalidResourceError', message: 'Invalid agent' });
    });

    it('addAgent should throw for existing agent', async function () {
        const newAgent = makeValidAgent();
        agentExistsStub.returns(true);

        await assert.rejects(() => sut.addAgent(newAgent), { name: 'ResourceConflictError', message: 'Agent with id 101 already exists' });
    });

    it('addAgent should succeed for valid agent that does not exist', async function () {
        const newAgent = makeValidAgent();
        agentExistsStub.returns(false);

        await assert.doesNotReject(() => sut.addAgent(newAgent));
        assert.equal(addAgentStub.called, true);
    });

    // TODO: Add tests for other methods containing logic.
});

function makeValidAgent() {
    return {
        _id: 101,
        name: "John Doe",
        address: "123 Main Street #200",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        tier: 2,
        phone: {
            primary: "206-221-2345",
            mobile: "206-555-3211"
        }
    };
};

function makeAgentWithMissingName() {
    let result = makeValidAgent();
    result.name = null;
    return result;
}