'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../api/controllers/agentController').AgentController;
const ServiceFactory = require('../service/serviceFactory').ServiceFactory;
const AgentService = require('../service/agentService').AgentService;
const ResponseService = require('../service/responseService').ResponseService;
const TestHelpers = require('./testHelpers').TestHelpers;
const TestData = require('./agentTestData').AgentTestData;

describe('Agent controller', function () {
    const fakeRepo = {},
        fakeValidator = {},
        testData = new TestData(),
        testHelpers = new TestHelpers();

    let sut,
        factory,
        makeAgentServiceStub,
        makeResponseServiceStub,
        agentService,
        responseService,
        getAllAgentsStub,
        addAgentStub,
        getAgentByIdStub,
        addOrUpdateAgentStub,
        jsonStub,
        statusStub,
        endStub,
        getCreatedResponseStub,
        req,
        res,
        errorLogStub;

    this.beforeEach(function () {
        factory = new ServiceFactory();
        makeAgentServiceStub = sinon.stub(factory, 'makeAgentService');
        makeResponseServiceStub = sinon.stub(factory, 'makeResponseService');
        agentService = new AgentService(fakeValidator, fakeRepo);
        responseService = new ResponseService();
        getAllAgentsStub = sinon.stub(agentService, 'getAllAgents');
        addAgentStub = sinon.stub(agentService, 'addAgent');
        getAgentByIdStub = sinon.stub(agentService, 'getAgentById');
        addOrUpdateAgentStub = sinon.stub(agentService, 'addOrUpdateAgent');
        req = testHelpers.makeFakeRequest();
        res = testHelpers.makeFakeResponse();
        jsonStub = sinon.stub(res, 'json');
        statusStub = sinon.stub(res, 'status');
        endStub = sinon.stub(res, 'end');
        getCreatedResponseStub = sinon.stub(responseService, 'getCreatedResponse');
        errorLogStub = sinon.stub(console, 'error');
    });

    this.afterEach(function () {
        sinon.restore();
    });

    it('getAllAgents with a successful service call should result in expected response', async function () {
        const allAgents = makeAllAgents();
        getAllAgentsStub.resolves(allAgents);
        makeAgentServiceStub.returns(agentService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        await sut.getAllAgents(req, res);

        assert.equal(jsonStub.calledWith(allAgents), true);
    });

    it('getAllAgents with a failed service call should result in expected error response', async function () {
        getAllAgentsStub.rejects();
        makeAgentServiceStub.returns(agentService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        await sut.getAllAgents(req, res);

        assert.equal(statusStub.calledWith(500), true);
        assert.equal(errorLogStub.called, true);
    });

    it('addAgent with a successful service call should result in expected response', async function () {
        addAgentStub.resolves();
        makeAgentServiceStub.returns(agentService);
        makeResponseServiceStub.returns(responseService);
        const newAgent = testData.makeValidAgent();
        req.body = newAgent;
        sut = new Sut(factory);

        await sut.addAgent(req, res);

        assert.equal(getCreatedResponseStub.called, true);
        assert.equal(jsonStub.calledWith(newAgent), true);
    });

    it('addAgent with a failed service call should result in expected error response', async function () {
        addAgentStub.rejects();
        makeAgentServiceStub.returns(agentService);
        makeResponseServiceStub.returns(responseService);
        const newAgent = testData.makeValidAgent();
        req.body = newAgent;
        sut = new Sut(factory);

        await sut.addAgent(req, res);

        assert.equal(statusStub.calledWith(500), true);
        assert.equal(errorLogStub.called, true);
    });

    it('getAgent with a successful service call should result in expected response', async function () {
        const agent = testData.makeValidAgent();
        getAgentByIdStub.resolves(agent);
        makeAgentServiceStub.returns(agentService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        await sut.getAgent(req, res);

        assert.equal(jsonStub.calledWith(agent), true);
    });

    it('getAgent with a failed service call should result in expected error response', async function () {
        getAgentByIdStub.rejects();
        makeAgentServiceStub.returns(agentService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        await sut.getAgent(req, res);

        assert.equal(statusStub.calledWith(500), true);
        assert.equal(errorLogStub.called, true);
    });

    it('addOrUpdateAgent with a successful service call should result in expected response', async function () {
        addOrUpdateAgentStub.resolves();
        makeAgentServiceStub.returns(agentService);
        makeResponseServiceStub.returns(responseService);
        statusStub.returns(res);
        const agent = testData.makeValidAgent();
        req.body = agent;
        sut = new Sut(factory);

        await sut.addOrUpdateAgent(req, res);

        assert.equal(statusStub.calledWith(200), true);
        assert.equal(endStub.called, true);
    });

    it('addOrUpdateAgent with a failed service call should result in expected error response', async function () {
        addOrUpdateAgentStub.rejects();
        makeAgentServiceStub.returns(agentService);
        makeResponseServiceStub.returns(responseService);
        const agent = testData.makeValidAgent();
        req.body = agent;
        sut = new Sut(factory);

        await sut.addOrUpdateAgent(req, res);

        assert.equal(statusStub.calledWith(500), true);
        assert.equal(errorLogStub.called, true);
    });
});

function makeAllAgents() {
    const allAgents = [
        {
            "_id": 101,
            "name": "John Doe",
            "address": "123 Main Street #200",
            "city": "Seattle",
            "state": "WA",
            "zipCode": "98101",
            "tier": 2,
            "phone": {
                "primary": "206-221-2345",
                "mobile": "206-555-3211"
            }
        },
        {
            "_id": 467,
            "name": "Joseph Schmoe",
            "address": "2765 There Street",
            "city": "Charlotte",
            "state": "NC",
            "zipCode": "28205",
            "tier": 3,
            "phone": {
                "primary": "828-865-2345",
                "mobile": "828-432-3211"
            }
        },
        {
            "_id": 1987,
            "name": "Bob Loblaw",
            "address": "123 Main Street #200",
            "city": "Laguna Beach",
            "state": "CA",
            "zipCode": "92677",
            "tier": 2,
            "phone": {
                "primary": "714-765-2349",
                "mobile": "714-496-3288"
            }
        }
    ];

    return allAgents;
}