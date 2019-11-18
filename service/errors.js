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

exports.InvalidResourceError = InvalidResourceError;
exports.ResourceConflictError = ResourceConflictError;