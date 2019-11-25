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

    describe('getAgentCustomers', function () {
        it('with a successful service call should result in expected response', async function () {
            const agentCustomers = testData.makeAgentCustomers();
            getAgentCustomersStub.resolves(agentCustomers);
            makeCustomerServiceStub.returns(customerService);
            makeResponseServiceStub.returns(responseService);
            sut = new Sut(factory);

            await sut.getAgentCustomers(req, res);

            assert.equal(jsonStub.calledWith(agentCustomers), true);
        });

        it('with a failed service call should result in expected error response', async function () {
            getAgentCustomersStub.rejects();
            makeCustomerServiceStub.returns(customerService);
            makeResponseServiceStub.returns(responseService);
            sut = new Sut(factory);

            await sut.getAgentCustomers(req, res);

            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);
        });
    });

    describe('addCustomer', function () {
        it('with a successful service call should result in expected response', async function () {
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

        it('with a failed service call should result in expected error response', async function () {
            const newCustomer = testData.makeValidCustomer();
            req.body = newCustomer;
            addCustomerStub.rejects();
            makeCustomerServiceStub.returns(customerService);
            makeResponseServiceStub.returns(responseService);
            sut = new Sut(factory);

            await sut.addCustomer(req, res);

            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);
        });
    });

    describe('removeCustomer', function () {
        it('with a successful service call should result in expected response', async function () {
            removeCustomerStub.resolves();
            makeCustomerServiceStub.returns(customerService);
            makeResponseServiceStub.returns(responseService);
            statusStub.returns(res);
            sut = new Sut(factory);

            await sut.removeCustomer(req, res);

            assert.equal(statusStub.calledWith(204), true);
            assert.equal(endStub.called, true);
        });

        it('with a failed service call should result in expected error response', async function () {
            removeCustomerStub.rejects();
            makeCustomerServiceStub.returns(customerService);
            makeResponseServiceStub.returns(responseService);
            sut = new Sut(factory);

            await sut.removeCustomer(req, res);

            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);
        });
    });

    describe('addOrUpdateCustomer', function () {
        it('with a successful service call should result in expected response', async function () {
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

        it('with a failed service call should result in expected error response', async function () {
            const customer = testData.makeValidCustomer();
            req.body = customer;
            addOrUpdateCustomerStub.rejects();
            makeCustomerServiceStub.returns(customerService);
            makeResponseServiceStub.returns(responseService);
            sut = new Sut(factory);

            await sut.addOrUpdateCustomer(req, res);

            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);
        });
    });

    describe('getCustomer', function () {
        it('with a successful service call should result in expected response', async function () {
            const customer = testData.makeValidCustomer();
            getCustomerStub.resolves(customer);
            makeCustomerServiceStub.returns(customerService);
            makeResponseServiceStub.returns(responseService);
            sut = new Sut(factory);

            await sut.getCustomer(req, res);

            assert.equal(jsonStub.calledWith(customer), true);
        });

        it('with a failed service call should result in expected error response', async function () {
            getCustomerStub.rejects();
            makeCustomerServiceStub.returns(customerService);
            makeResponseServiceStub.returns(responseService);
            sut = new Sut(factory);

            await sut.getCustomer(req, res);

            assert.equal(statusStub.calledWith(500), true);
            assert.equal(errorLogStub.called, true);
        });
    });
});