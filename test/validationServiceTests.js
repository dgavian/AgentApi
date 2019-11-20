'use strict';

const assert = require('assert');
const Sut = require('../service/validationService').ValidationService;

describe('Validation service', function () {
    let sut;
    this.beforeEach(function () {
        sut = new Sut();
    });

    it('isValidAgent should return true for a valid agent', function () {
        const testObj = makeValidAgent(),
            expected = true,
            actual = sut.isValidAgent(testObj);

        assert.equal(actual, expected);
    });

    it('isValidAgent should return false for an agent with a missing agent', function () {
        const testObj = null,
            expected = false,
            actual = sut.isValidAgent(testObj);

        assert.equal(actual, expected);
    });

    it('isValidAgent should return false for an agent with a missing name', function () {
        const testObj = makeAgentWithMissingName(),
            expected = false,
            actual = sut.isValidAgent(testObj);

        assert.equal(actual, expected);
    });

    // TODO: Add tests for other missing/empty properties.

    it('isValidAgent should return false for an agent with an id that is not an integer', function () {
        const testObj = makeAgentWithInvalidId(),
            expected = false,
            actual = sut.isValidAgent(testObj);

        assert.equal(actual, expected);
    });

    it('isValidAgent should return false for an agent without at least one phone number supplied', function () {
        const testObj = makeAgentWithNoPhone(),
            expected = false,
            actual = sut.isValidAgent(testObj);

        assert.equal(actual, expected);
    });

    // TODO: Add additional tests for customer validation methods.
});

function makeValidAgent() {
    return {
        _id: 101,
        name: "John Doe",
        address: "123 Main Street #200",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        tier: 2,
        phone: {
            primary: "206-221-2345",
            mobile: "206-555-3211"
        }
    };
};

function makeAgentWithMissingName() {
    let result = makeValidAgent();
    result.name = null;
    return result;
}

function makeAgentWithInvalidId() {
    let result = makeValidAgent();
    result._id = 'Foo';
    return result;
}

function makeAgentWithNoPhone() {
    let result = makeValidAgent();
    result.phone.primary = null;
    result.phone.mobile = null;
    return result;
}