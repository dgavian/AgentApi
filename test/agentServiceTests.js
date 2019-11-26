'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../service/agentService').AgentService;
const Validator = require('../service/validationService').ValidationService;
const Repo = require('../service/agentRepo').AgentRepo;
const TestData = require('./agentTestData').AgentTestData;

const agentId = 42;

describe('Agent service', function () {
    let sut,
        validator,
        repo,
        agentExistsStub,
        addAgentStub,
        getAgentStub,
        updateAgentStub,
        testData;

    this.beforeEach(function () {
        repo = new Repo();
        validator = new Validator();
        agentExistsStub = sinon.stub(repo, 'agentExists');
        addAgentStub = sinon.stub(repo, 'addAgent');
        getAgentStub = sinon.stub(repo, 'getAgent');
        updateAgentStub = sinon.stub(repo, 'updateAgent');
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

    describe('getAgentById', function() {
        it('should throw if agent is not found', async function () {
            const agent = null;
            getAgentStub.returns(agent);

            await assert.rejects(() => sut.getAgentById(agentId), { name: 'NotFoundError' });
        });

        it('should return the expected agent', async function () {
            const agent = testData.makeValidAgent();
            getAgentStub.returns(agent);

            const actual = await sut.getAgentById(agentId);

            assert.deepEqual(actual, agent);
        });
    });

    describe('addOrUpdateAgent', function () {
        it ('should throw for invalid agent', async function () {
            const agent = testData.makeValidAgent();
            agent.name = null;
            await assert.rejects(() => sut.addOrUpdateAgent(agentId, agent), { name: 'InvalidResourceError' });
        });

        it ('should call update agent for existing agent', async function () {
            const agent = testData.makeValidAgent();
            agentExistsStub.returns(true);

            await sut.addOrUpdateAgent(agentId, agent);

            assert.equal(updateAgentStub.called, true);
        });

        it ('should call add agent for new agent', async function () {
            const agent = testData.makeValidAgent();
            agentExistsStub.returns(false);

            await sut.addOrUpdateAgent(agentId, agent);

            assert.equal(addAgentStub.called, true);
        });
    });
});