'use strict';

class InvalidResourceError extends Error {
    constructor (message) {
        super (message);
        this.name = 'InvalidResourceError';
    }
}

class ResourceConflictError extends Error {
    constructor (message) {
        super (message);
        this.name = 'ResourceConflictError';
    }
}

class NotFoundError extends Error {
    constructor (message) {
        super (message);
        this.name = 'NotFoundError';
    }
}

class UnprocessableError extends Error {
    constructor (message) {
        super (message);
        this.name = 'UnprocessableError';
    }
}


exports.InvalidResourceError = InvalidResourceError;
exports.ResourceConflictError = ResourceConflictError;
exports.NotFoundError = NotFoundError;
exports.UnprocessableError = UnprocessableError;