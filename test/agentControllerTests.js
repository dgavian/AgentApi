'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../api/controllers/agentController').AgentController;
const ServiceFactory = require('../service/serviceFactory').ServiceFactory;
const AgentService = require('../service/agentService').AgentService;
const TestHelpers = require('./testHelpers').TestHelpers;
const TestData = require('./agentTestData').AgentTestData;

describe('Agent controller', function () {
    const fakeRepo = {},
        fakeValidator = {},
        testData = new TestData(),
        testHelpers = new TestHelpers();

    let sut,
        factory,
        factoryStub,
        service,
        getAllAgentsStub,
        addAgentStub,
        getAgentByIdStub,
        addOrUpdateAgentStub,
        jsonStub,
        req,
        res;

    this.beforeEach(function () {
        factory = new ServiceFactory();
        factoryStub = sinon.stub(factory, 'makeAgentService');
        service = new AgentService(fakeValidator, fakeRepo);
        getAllAgentsStub = sinon.stub(service, 'getAllAgents');
        addAgentStub = sinon.stub(service, 'addAgent');
        getAgentByIdStub = sinon.stub(service, 'getAgentById');
        addOrUpdateAgentStub = sinon.stub(service, 'addOrUpdateAgent');
        req = testHelpers.makeFakeRequest();
        res = testHelpers.makeFakeResponse();
        jsonStub = sinon.stub(res, 'json');
    });

    this.afterEach(function () {
        sinon.restore();
    });

    it('getAllAgents with a successful service call should result in expected response', function () {
        const allAgents = makeAllAgents();
        getAllAgentsStub.resolves(allAgents);
        factoryStub.returns(service);
        sut = new Sut(factory);

        sut.getAllAgents(req, res)
            .then(() => {
                assert.equal(res.statusCode, 200);
                assert.equal(jsonStub.called, true);
            })
            .catch(error => {
                assert.fail();
            });
    });

    it('getAllAgents with a failed service call should result in expected error response', function () {
        const allAgents = makeAllAgents();
        getAllAgentsStub.rejects();
        factoryStub.returns(service);
        sut = new Sut(factory);

        sut.getAllAgents(req, res)
            .then(() => {
                assert.fail();
            })
            .catch(error => {
                assert.equal(res.statusCode, 500);
                assert.equal(jsonStub.called, true);
            });
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