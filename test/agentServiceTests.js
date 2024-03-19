'use strict';

const sinon = require('sinon');
const chai = require('chai');
chai.should();
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const Sut = require('../service/agentService').AgentService;
const Validator = require('../service/validationService').ValidationService;
const Repo = require('../service/agentRepo').AgentRepo;
const TestData = require('./agentTestData').AgentTestData;
const { InvalidResourceError, ResourceConflictError } = require('../service/errors');

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

    it('addAgent should throw for invalid agent', async function () {
        const newAgent = testData.makeValidAgent();
        newAgent.name = null;

        await sut.addAgent(newAgent).should.be.rejectedWith(InvalidResourceError);
    });

    it('addAgent should throw for existing agent', async function () {
        const newAgent = testData.makeValidAgent();
        agentExistsStub.returns(true);

        await sut.addAgent(newAgent).should.be.rejectedWith(ResourceConflictError);
    });

    it('addAgent should succeed for valid agent that does not exist', async function () {
        const newAgent = testData.makeValidAgent();
        agentExistsStub.returns(false);

        await sut.addAgent(newAgent);
        addAgentStub.should.have.been.calledWith(newAgent);
    });

    // TODO: Add tests for other methods containing logic.
});