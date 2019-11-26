'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../service/customerService').CustomerService;
const Validator = require('../service/validationService').ValidationService;
const CustomerRepo = require('../service/customerRepo').CustomerRepo;
const AgentRepo = require('../service/agentRepo').AgentRepo;
const TestData = require('./customerTestData').CustomerTestData;

describe('Customer service', function () {
    const agentId = 42;

    let sut,
        validator,
        customerRepo,
        agentRepo,
        getAgentCustomersStub,
        agentExistsStub,
        customerExistsStub,
        addCustomerStub,
        testData;

    this.beforeEach(function () {
        customerRepo = new CustomerRepo();
        agentRepo = new AgentRepo();
        validator = new Validator();
        getAgentCustomersStub = sinon.stub(customerRepo, 'getAgentCustomers');
        agentExistsStub = sinon.stub(agentRepo, 'agentExists');
        customerExistsStub = sinon.stub(customerRepo, 'customerExists');
        addCustomerStub = sinon.stub(customerRepo, 'addCustomer');
        sut = new Sut(validator, customerRepo, agentRepo);
        testData = new TestData();
    });

    this.afterEach(function () {
        sinon.restore();
    });

    describe('getAgentCustomers', function () {
        it ('should throw a not found error if no customers are returned for the given agent', async function () {
            const agentCustomers = [];
            getAgentCustomersStub.resolves(agentCustomers);

            await assert.rejects(() => sut.getAgentCustomers(agentId), { name: 'NotFoundError' });
        });

        it ('should succeed if customers are returned for the given agent', async function () {
            const agentCustomers = testData.makeAgentCustomers();
            getAgentCustomersStub.resolves(agentCustomers);

            await assert.doesNotReject(() => sut.getAgentCustomers(agentId));
        });
    });

    describe('addCustomer', function () {
        it ('should throw for invalid customer', async function () {
            const newCustomer = null;
            
            await assert.rejects(() => sut.addCustomer(newCustomer, agentId), { name: 'InvalidResourceError' });
        });

        it ('should throw if the agent does not exist', async function () {
            const newCustomer = testData.makeValidCustomer();
            agentExistsStub.resolves(false);
            
            await assert.rejects(() => sut.addCustomer(newCustomer, agentId), { name: 'UnprocessableError' });
        });

        it ('should throw if the customer already exists', async function () {
            const newCustomer = testData.makeValidCustomer();
            agentExistsStub.resolves(true);
            customerExistsStub.resolves(true);
            
            await assert.rejects(() => sut.addCustomer(newCustomer, agentId), { name: 'ResourceConflictError' });
        });

        it ('should call add customer if the customer does not exist', async function () {
            const newCustomer = testData.makeValidCustomer();
            agentExistsStub.resolves(true);
            customerExistsStub.resolves(false);
            
            await sut.addCustomer(newCustomer, agentId);

            assert.equal(addCustomerStub.called, true);
        });
    });
});