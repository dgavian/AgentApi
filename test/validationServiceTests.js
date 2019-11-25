'use strict';

const assert = require('assert');

const Sut = require('../service/validationService').ValidationService;
const TestData = require('./agentTestData').AgentTestData;

describe('Validation service', function () {
    let sut, testData;
    this.beforeEach(function () {
        sut = new Sut();
        testData = new TestData();
    });

    describe('isValidAgent', function () {
        it('should return true for a valid agent', function () {
            const testObj = testData.makeValidAgent(),
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
    
        it('should return false for an agent with a missing name', function () {
            const testObj = testData.makeValidAgent(),
                expected = false;
            testObj.name = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });
    
        // TODO: Add tests for other missing/empty properties.
    
        it('should return false for an agent with an id that is not an integer', function () {
            const testObj = testData.makeValidAgent(),
                expected = false;
            testObj._id = 'Foo';
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });
    
        it('should return false for an agent without at least one phone number supplied', function () {
            const testObj = testData.makeValidAgent(),
                expected = false;
            testObj.phone.primary = null;
            testObj.phone.mobile = null;
    
            const actual = sut.isValidAgent(testObj);
    
            assert.equal(actual, expected);
        });
    });


    // TODO: Add additional tests for customer validation methods.
});