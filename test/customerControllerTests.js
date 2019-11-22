'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../api/controllers/customerController').CustomerController;
const ServiceFactory = require('../service/serviceFactory').ServiceFactory;
const CustomerService = require('../service/customerService').CustomerService;
const ResponseService = require('../service/responseService').ResponseService;
const TestHelpers = require('./testHelpers').TestHelpers;
const TestData = require('./customerTestData').CustomerTestData;

describe('Customer controller', function () {
    const fakeCustRepo = {},
        fakeAgentRepo = {},
        fakeValidator = {},
        testData = new TestData(),
        testHelpers = new TestHelpers();

    let sut,
        factory,
        makeCustomerServiceStub,
        makeResponseServiceStub,
        customerService,
        responseService,
        getAgentCustomersStub,
        addCustomerStub,
        removeCustomerStub,
        addOrUpdateCustomerStub,
        getCustomerStub,
        jsonStub,
        statusStub,
        endStub,
        getCreatedResponseStub,
        req,
        res,
        errorLogStub;

    this.beforeEach(function () {
        factory = new ServiceFactory();
        makeCustomerServiceStub = sinon.stub(factory, 'makeCustomerService');
        makeResponseServiceStub = sinon.stub(factory, 'makeResponseService');
        customerService = new CustomerService(fakeValidator, fakeCustRepo, fakeAgentRepo);
        responseService = new ResponseService();
        getAgentCustomersStub = sinon.stub(customerService, 'getAgentCustomers');
        addCustomerStub = sinon.stub(customerService, 'addCustomer');
        removeCustomerStub = sinon.stub(customerService, 'removeCustomer');
        addOrUpdateCustomerStub = sinon.stub(customerService, 'addOrUpdateCustomer');
        getCustomerStub = sinon.stub(customerService, 'getCustomer');
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

    it('getAgentCustomers with a successful service call should result in expected response', async function () {
        const agentCustomers = makeAgentCustomers();
        getAgentCustomersStub.resolves(agentCustomers);
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        await sut.getAgentCustomers(req, res);

        assert.equal(jsonStub.calledWith(agentCustomers), true);
    });

    it('getAgentCustomers with a failed service call should result in expected error response', async function () {
        getAgentCustomersStub.rejects();
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        try {
            await sut.getAgentCustomers(req, res);
            assert.fail();
        } catch (e) {
            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);
        }
    });

    it('addCustomer with a successful service call should result in expected response', async function () {
        const newCustomer = testData.makeValidCustomer();
        req.body = newCustomer;
        addCustomerStub.resolves();
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        await sut.addCustomer(req, res);

        assert.equal(getCreatedResponseStub.called, true);
        assert.equal(jsonStub.calledWith(newCustomer), true);
    });

    it('addCustomer with a failed service call should result in expected error response', async function () {
        const newCustomer = testData.makeValidCustomer();
        req.body = newCustomer;
        addCustomerStub.rejects();
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        try {
            await sut.addCustomer(req, res);
            assert.fail();
        } catch (e) {
            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);
        }
    });

    it('removeCustomer with a successful service call should result in expected response', async function () {
        removeCustomerStub.resolves();
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        statusStub.returns(res);
        sut = new Sut(factory);

        await sut.removeCustomer(req, res);

        assert.equal(statusStub.calledWith(204), true);
        assert.equal(endStub.called, true);
    });

    it('removeCustomer with a failed service call should result in expected error response', async function () {
        removeCustomerStub.rejects();
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        try {
            await sut.removeCustomer(req, res);
            assert.fail();
        } catch (e) {
            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);
        }
    });

    it('addOrUpdateCustomer with a successful service call should result in expected response', async function () {
        const customer = testData.makeValidCustomer();
        req.body = customer;
        addOrUpdateCustomerStub.resolves();
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        statusStub.returns(res);
        sut = new Sut(factory);

        await sut.addOrUpdateCustomer(req, res);

        assert.equal(statusStub.calledWith(200), true);
        assert.equal(endStub.called, true);
    });

    it('addOrUpdateCustomer with a failed service call should result in expected error response', async function () {
        const customer = testData.makeValidCustomer();
        req.body = customer;
        addOrUpdateCustomerStub.rejects();
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        try {
            await sut.addOrUpdateCustomer(req, res);
            assert.fail();
        } catch (e) {
            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);    
        }
    });

    it('getCustomer with a successful service call should result in expected response', async function () {
        const customer = testData.makeValidCustomer();
        getCustomerStub.resolves(customer);
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        await sut.getCustomer(req, res);

        assert.equal(jsonStub.calledWith(customer), true);
    });

    it('getCustomer with a failed service call should result in expected error response', async function () {
        getCustomerStub.rejects();
        makeCustomerServiceStub.returns(customerService);
        makeResponseServiceStub.returns(responseService);
        sut = new Sut(factory);

        try {
            await sut.getCustomer(req, res);
            assert.fail();
        } catch (e) {
            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);    
        }
    });
});

function makeAgentCustomers() {
    const agentCustomers = [{
        "_id": 5054,
        "agent_id": 1987,
        "guid": "54fc8606-0630-42f9-9e3c-716772df09bf",
        "isActive": true,
        "balance": "$1,578.40",
        "age": 57,
        "eyeColor": "blue",
        "name": {
            "first": "Neva",
            "last": "Calderon"
        },
        "company": "ISOTRONIC",
        "email": "neva.calderon@isotronic.info",
        "phone": "+1 (985) 502-2956",
        "address": "573 Turner Place, Yukon, Federated States Of Micronesia, 762",
        "registered": "Wednesday, January 31, 2018 12:40 PM",
        "latitude": "76.989498",
        "longitude": "26.410977",
        "tags": [
            "eiusmod",
            "reprehenderit",
            "labore",
            "ut",
            "dolor"
        ]
    },
    {
        "_id": 8203,
        "agent_id": 467,
        "guid": "60e09079-3b7b-434a-9030-5f7f98eda232",
        "isActive": true,
        "balance": "$2,634.30",
        "age": 62,
        "eyeColor": "brown",
        "name": {
            "first": "Pope",
            "last": "Wheeler"
        },
        "company": "GEEKOLOGY",
        "email": "pope.wheeler@geekology.co.uk",
        "phone": "+1 (910) 453-2823",
        "address": "825 Cropsey Avenue, Homeworth, Puerto Rico, 7683",
        "registered": "Thursday, January 16, 2014 2:49 AM",
        "latitude": "59.528935",
        "longitude": "52.987053",
        "tags": [
            "cillum",
            "voluptate",
            "duis",
            "mollit",
            "ea"
        ]
    },
    {
        "_id": 4904,
        "agent_id": 321,
        "guid": "f5c1ffed-fd1a-450f-94a8-f2d0842de50c",
        "isActive": false,
        "balance": "$3,612.71",
        "age": 38,
        "eyeColor": "blue",
        "name": {
            "first": "Buchanan",
            "last": "Barr"
        },
        "company": "ZAPPIX",
        "email": "buchanan.barr@zappix.net",
        "phone": "+1 (932) 473-3214",
        "address": "410 Melrose Street, Chaparrito, Washington, 1367",
        "registered": "Thursday, February 11, 2016 12:17 PM",
        "latitude": "58.098824",
        "longitude": "130.811528",
        "tags": [
            "ad",
            "laboris",
            "consectetur",
            "nulla",
            "nulla"
        ]
    }];

    return agentCustomers;
}