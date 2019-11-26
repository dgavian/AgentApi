'use strict';

const assert = require('assert');
const sinon = require('sinon');

const Sut = require('../service/responseService').ResponseService;
const errors = require('../service/errors');
const TestHelpers = require('./testHelpers').TestHelpers;

describe('Response service', function () {
    const testMessage = 'Test error message';
    let sut, testHelpers, res, statusStub, errorLogStub;
    
    this.beforeEach(function () {
        sut = new Sut();
        testHelpers = new TestHelpers();
        res = testHelpers.makeFakeResponse();
        statusStub = sinon.stub(res, 'status');
        errorLogStub = sinon.stub(console, 'error');
    });

    this.afterEach(function () {
        sinon.restore();
    });

    describe ('getErrorResponse', function () {
        it ('should set status to 400 for an invalid resource error', function () {
            const err = new errors.InvalidResourceError(testMessage);

            const actual = sut.getErrorResponse(err, res);

            assert.equal(statusStub.calledWith(400), true);
        });

        it ('should set status to 409 for a conflict error', function () {
            const err = new errors.ResourceConflictError(testMessage);

            const actual = sut.getErrorResponse(err, res);

            assert.equal(statusStub.calledWith(409), true);
        });

        it ('should set status to 404 for a not found error', function () {
            const err = new errors.NotFoundError(testMessage);

            const actual = sut.getErrorResponse(err, res);

            assert.equal(statusStub.calledWith(404), true);
        });

        it ('should set status to 422 for an unprocessable error', function () {
            const err = new errors.UnprocessableError(testMessage);

            const actual = sut.getErrorResponse(err, res);

            assert.equal(statusStub.calledWith(422), true);
        });

        it ('should set status to 500 for a generic error', function () {
            const err = new Error(testMessage);

            const actual = sut.getErrorResponse(err, res);

            assert.equal(statusStub.calledWith(500), true);
        });

        it ('should not use the message from the error for a generic error', function () {
            const err = new Error(testMessage);

            const actual = sut.getErrorResponse(err, res);

            assert.notEqual(actual.message, testMessage);
        });
    });
});