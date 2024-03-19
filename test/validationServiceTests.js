'use strict';

const chai = require('chai');

chai.should();

const Sut = require('../service/validationService').ValidationService;
const TestData = require('./agentTestData').AgentTestData;

describe('Validation service', function () {
    let sut, testData;
    this.beforeEach(function () {
        sut = new Sut();
        testData = new TestData();
    });

    it('isValidAgent should return true for a valid agent', function () {
        const testObj = testData.makeValidAgent(),
            actual = sut.isValidAgent(testObj);

        actual.should.be.true;
    });

    it('isValidAgent should return false for an agent with a missing agent', function () {
        const testObj = null,
            actual = sut.isValidAgent(testObj);

        actual.should.be.false;
    });

    it('isValidAgent should return false for an agent with a missing name', function () {
        const testObj = testData.makeValidAgent();
        testObj.name = null;

        const actual = sut.isValidAgent(testObj);

        actual.should.be.false;
    });

    // TODO: Add tests for other missing/empty properties.

    it('isValidAgent should return false for an agent with an id that is not an integer', function () {
        const testObj = testData.makeValidAgent();
        testObj._id = 'Foo';

        const actual = sut.isValidAgent(testObj);

        actual.should.be.false;
    });

    it('isValidAgent should return false for an agent without at least one phone number supplied', function () {
        const testObj = testData.makeValidAgent();
        testObj.phone.primary = null;
        testObj.phone.mobile = null;

        const actual = sut.isValidAgent(testObj);

        actual.should.be.false;
    });

    // TODO: Add additional tests for customer validation methods.
});