'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../service/agentService').AgentService;
const Validator = require('../service/validationService').ValidationService;
const Repo = require('../service/agentRepo').AgentRepo;
const TestData = require('./agentTestData').AgentTestData;

describe('Agent service', function () {
    let sut,
        validator,
        repo,
        agentExistsStub,
        addAgentStub,
        testData;

    this.beforeEach(function () {
        repo = new Repo();
        validator = new Validator();
        agentExistsStub = sinon.stub(repo, 'agentExists');
        addAgentStub = sinon.stub(repo, 'addAgent');
        sut = new Sut(validator, repo);
        testData = new TestData();        
    });

    this.afterEach(function () {
        sinon.restore();
    });

    describe('addAgent', function () {
        it('should throw for invalid agent', async function () {
            const newAgent = testData.makeValidAgent();
            newAgent.name = null;
            await assert.rejects(() => sut.addAgent(newAgent), { name: 'InvalidResourceError' });
        });
    
        it('should throw for existing agent', async function () {
            const newAgent = testData.makeValidAgent();
            agentExistsStub.returns(true);
    
            await assert.rejects(() => sut.addAgent(newAgent), { name: 'ResourceConflictError' });
        });
    
        it('should succeed for valid agent that does not exist', async function () {
            const newAgent = testData.makeValidAgent();
            agentExistsStub.returns(false);
    
            await assert.doesNotReject(() => sut.addAgent(newAgent));
            assert.equal(addAgentStub.called, true);
        });
    });

    // TODO: Add tests for other methods containing logic.
});