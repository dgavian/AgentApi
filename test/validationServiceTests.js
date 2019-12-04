'use strict';

const assert = require('assert');

const Sut = require('../service/validationService').ValidationService;
const AgentTestData = require('./agentTestData').AgentTestData;
const CustomerTestData = require('./customerTestData').CustomerTestData;

describe('Validation service', function () {
    let sut, agentTestData, customerTestData;
    this.beforeEach(function () {
        sut = new Sut();
    });

    describe('isValidAgent', function () {
        this.beforeEach(function () {
            agentTestData = new AgentTestData();
        });

        it('should return true for a valid agent', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = true,
                actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });
    
        it('should return false for an agent with a missing agent', function () {
            const testObj = null,
                expected = false,
                actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });

        it('should return false for an agent with a missing id', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj._id = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });
    
        it('should return false for an agent with a missing name', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj.name = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });

        it('should return false for an agent with a missing address', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj.address = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });

        
        it('should return false for an agent with a missing city', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj.city = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });

        it('should return false for an agent with a missing state', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj.state = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });

        it('should return false for an agent with a missing zipCode', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj.zipCode = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });

        it('should return false for an agent with a missing tier', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj.tier = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });

        it('should return false for an agent with a missing phone', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj.phone = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });
    
        it('should return false for an agent with an id that is not an integer', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj._id = 'Foo';
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });
    
        it('should return false for an agent without at least one phone number supplied', function () {
            const testObj = agentTestData.makeValidAgent(),
                expected = false;
            testObj.phone.primary = null;
            testObj.phone.mobile = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });
    });


    describe('isValidCustomer', function () {
        let agentId;

        this.beforeEach(function () {
            customerTestData = new CustomerTestData();
            agentId = 42;
        });

        it('should return true for a valid customer', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = true;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing customer', function () {
            const testObj = null,
                expected = false;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for an invalid agent id', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            agentId = 'Foo';

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing agent id', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            agentId = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing id', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj._id = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing guid', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj.guid = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing isActive flag', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj.isActive = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing name', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj.name = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing company', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj.company = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing email', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj.email = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing phone', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj.phone = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing address', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj.address = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for a missing registered date', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj.registered = null;

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        it('should return false for an invalid id', function () {
            const testObj = customerTestData.makeValidCustomer(),
                expected = false;
            testObj._id = 'Foo';

            const actual = sut.isValidCustomer(testObj, agentId);

            assert.equal(actual, expected);
        });

        // TODO: Test first/last name
    });
});