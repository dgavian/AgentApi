'use strict';

const ValidationService = function () {

    const validateTopLevelProps = function (obj, props) {

        for (let p of props) {
            if (!obj[p]) {
                return false;
            }
        }

        return true;
    };

    const validateId = function (id) {
        return Number.isInteger(id);
    };

    const validatePhone = function (phone) {
        const phoneProps = ['primary', 'mobile'];

        for (let p of phoneProps) {
            if (!phone[p]) {
                return false;
            }
        }

        return true;
    }

    const agentIdsMatch = function (agent, id) {
        const objId = agent._id;
        // Id is not required on the agent object in this context.
        if (!objId) {
            return true;
        }
        return (objId === id);
    }

    this.isValidAgent = function (agent) {
        if (!agent) {
            return false;
        }

        const agentProps = ['_id', 'name', 'address', 'city', 'state', 'zipCode', 'tier', 'phone'];

        if (!validateTopLevelProps(agent, agentProps)) {
            return false;
        }

        if (!validateId(agent._id)) {
            return false;
        }

        if (!validatePhone(agent.phone)) {
            return false;
        };

        return true;
    };

    this.isValidAgentForUpdate = function (agent, id) {
        if (!agent) {
            return false;
        }

        if (!validateId(id)) {
            return false;
        }

        if (!agentIdsMatch(agent, id)) {
            return false;
        }

        const agentProps = ['name', 'address', 'city', 'state', 'zipCode', 'tier', 'phone'];

        if (!validateTopLevelProps(agent, agentProps)) {
            return false;
        }

        if (!validatePhone(agent.phone)) {
            return false;
        };

        return true;
    };

    this.isValidCustomer = function (customer, agentId) {
        if (!customer) {
            return false;
        }

        if (!validateId(agentId)) {
            return false;
        }

        const custProps = ['_id', 'guid', 'isActive', 'name', 'company', 'email', 'phone', 'address', 'registered'];

        if (!validateTopLevelProps(customer, custProps)) {
            return false;
        }

        if (!validateId(customer._id)) {
            return false;
        }

        const nameProps = ['first', 'last'];
        if (!validateTopLevelProps(customer.name, nameProps)) {
            return false;
        }
        
        return true;
    }
};

exports.ValidationService = ValidationService;