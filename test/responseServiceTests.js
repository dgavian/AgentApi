'use strict';

const chai = require('chai');
const sinon = require('sinon');

chai.should();

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { InvalidResourceError, ResourceConflictError, NotFoundError, UnprocessableError } = require('../service/errors');

const { ResponseService: Sut } = require('../service/responseService');

describe('ResponseService', function() {
    const Res = function () {
        this.status = () => { };
        this.location = () => { };
    }
    
    let res;
    let statusStub;
    let locationStub;
    
    this.beforeEach(() => {
        res = new Res();
        statusStub = sinon.stub(res, 'status').returnsThis();
        locationStub = sinon.stub(res, 'location');
    });

    describe('getErrorResponse', function() {
        it ('should return produce the expected response for an invalid resource', () => {
            const message = 'Invalid resource'
            const err = new InvalidResourceError(message);
            const expectedStatus = 400;
            const expectedResult = { message };
            const sut = makeSut();

            const actual = sut.getErrorResponse(err, res);

            statusStub.should.have.been.calledWith(expectedStatus);
            actual.should.deep.equal(expectedResult);
        });

        it ('should return produce the expected response for a conflict', () => {
            const message = 'Conflict'
            const err = new ResourceConflictError(message);
            const expectedStatus = 409;
            const expectedResult = { message };
            const sut = makeSut();

            const actual = sut.getErrorResponse(err, res);

            statusStub.should.have.been.calledWith(expectedStatus);
            actual.should.deep.equal(expectedResult);
        });

        it ('should return produce the expected response for a not found resource', () => {
            const message = 'Not found'
            const err = new NotFoundError(message);
            const expectedStatus = 404;
            const expectedResult = { message };
            const sut = makeSut();

            const actual = sut.getErrorResponse(err, res);

            statusStub.should.have.been.calledWith(expectedStatus);
            actual.should.deep.equal(expectedResult);
        });

        it ('should return produce the expected response for a validation error', () => {
            const message = 'Unprocessable'
            const err = new UnprocessableError(message);
            const expectedStatus = 422;
            const expectedResult = { message };
            const sut = makeSut();

            const actual = sut.getErrorResponse(err, res);

            statusStub.should.have.been.calledWith(expectedStatus);
            actual.should.deep.equal(expectedResult);
        });

        it ('should return produce the expected response for an unexpected error', () => {
            const message = 'Unexpected'
            const err = new Error(message);
            const expectedStatus = 500;
            const expectedResult = { message: 'Internal Server Error' };
            const sut = makeSut();

            const actual = sut.getErrorResponse(err, res);

            statusStub.should.have.been.calledWith(expectedStatus);
            actual.should.deep.equal(expectedResult);
        });
    });

    describe('getCreatedResponse', function() {
        const req = {
            protocol: 'http',
            get: function(arg) {
                return `local${arg}:3000`
            },
            originalUrl: 'v1/testresource'
        };

        it('should make the expected response calls', () => {
            const newId = 42;
            const expectedLocationHeader = 'http://localhost:3000/v1/testresource/42';
            const createdStatus = 201;
            const sut = makeSut();

            sut.getCreatedResponse(req, newId, res);

            locationStub.should.have.been.calledWith(expectedLocationHeader);
            statusStub.should.have.been.calledWith(createdStatus);
        });
    });

    function makeSut() {
        return new Sut();
    }
});