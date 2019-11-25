'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../service/responseService').ResponseService;
const errors = require('../service/errors');
const TestHelpers = require('./testHelpers').TestHelpers;

describe('Response service', function () {
    const testMessage = 'Test error message';
    let sut, testHelpers, res, statusStub;
    
    this.beforeEach(function () {
        sut = new Sut();
        testHelpers = new TestHelpers();
        res = testHelpers.makeFakeResponse();
        statusStub = sinon.stub(res, 'status');
    });

    describe ('getErrorResponse', function () {
        it ('should set status to 400 for an invalid resource', function () {
            const err = new errors.InvalidResourceError(testMessage);

            const actual = sut.getErrorResponse(err, res);

            assert.equal(actual.message, testMessage);
            assert.equal(statusStub.calledWith(400), true);
        });
    });
});