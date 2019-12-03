'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../service/customerService').CustomerService;
const Validator = require('../service/validationService').ValidationService;
const CustomerRepo = require('../service/customerRepo').CustomerRepo;
const AgentRepo = require('../service/agentRepo').AgentRepo;
const TestData = require('./customerTestData').CustomerTestData;

describe('Customer service', function () {
    const agentId = 42,
        customerId = 420;

    let sut,
        validator,
        customerRepo,
        agentRepo,
        getAgentCustomersStub,
        agentExistsStub,
        customerExistsStub,
        addCustomerStub,
        updateCustomerStub,
        getCustomerStub,
        testData;

    this.beforeEach(function () {
        customerRepo = new CustomerRepo();
        agentRepo = new AgentRepo();
        validator = new Validator();
        getAgentCustomersStub = sinon.stub(customerRepo, 'getAgentCustomers');
        agentExistsStub = sinon.stub(agentRepo, 'agentExists');
        customerExistsStub = sinon.stub(customerRepo, 'customerExists');
        addCustomerStub = sinon.stub(customerRepo, 'addCustomer');
        updateCustomerStub = sinon.stub(customerRepo, 'updateCustomer');
        getCustomerStub = sinon.stub(customerRepo, 'getCustomer');
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

    describe('addOrUpdateCustomer', function () {
        it ('should throw if the agent does not exist', async function () {
            const customer = testData.makeValidCustomer();
            agentExistsStub.resolves(false);
            
            await assert.rejects(() => sut.addOrUpdateCustomer(customer, customerId, agentId), { name: 'UnprocessableError' });
        });
        
        it ('should throw for invalid customer', async function () {
            const customer = testData.makeValidCustomer();
            customer.company = null;
            agentExistsStub.resolves(true);
            
            await assert.rejects(() => sut.addOrUpdateCustomer(customer, customerId, agentId), { name: 'InvalidResourceError' });
        });

        it ('should call update customer if the customer exists', async function () {
            const customer = testData.makeValidCustomer();
            agentExistsStub.resolves(true);
            customerExistsStub.resolves(true);
            
            await sut.addOrUpdateCustomer(customer, customerId, agentId);

            assert.equal(updateCustomerStub.called, true);
        });

        it ('should call add customer if the customer does not exist', async function () {
            const customer = testData.makeValidCustomer();
            agentExistsStub.resolves(true);
            customerExistsStub.resolves(false);
            
            await sut.addOrUpdateCustomer(customer, customerId, agentId);

            assert.equal(addCustomerStub.called, true);
        });
    });

    describe('getCustomer', function () {
        it ('should throw if no customer is returned from the repository', async function () {
            const customer = null;
            getCustomerStub.resolves(customer);
    
            await assert.rejects(() => sut.getCustomer(customerId, agentId), { name: 'NotFoundError' });
        });

        it ('should return the customer returned from the repository', async function () {
            const customer = testData.makeValidCustomer();
            getCustomerStub.resolves(customer);

            const actual = await sut.getCustomer(customerId, agentId);

            assert.deepEqual(actual, customer);
        });
    });
});