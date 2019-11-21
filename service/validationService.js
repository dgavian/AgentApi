'use strict';

const ValidationService = function () {

    const validateRequiredProps = function (obj, props) {

        for (let p of props) {
            if (!obj[p] && obj[p] !== false && obj[p] !== 0) {
                return false;
            }
        }

        return true;
    };

    const validateId = function (id) {
        return Number.isInteger(id);
    };

    this.isValidAgent = function (agent) {
        if (!agent) {
            return false;
        }

        const requiredAgentProps = ['_id', 'name', 'address', 'city', 'state', 'zipCode', 'tier', 'phone'];
        if (!validateRequiredProps(agent, requiredAgentProps)) {
            return false;
        }

        if (!validateId(agent._id)) {
            return false;
        }

        const requiredPhoneProps = ['primary', 'mobile'];
        if (!validateRequiredProps(agent.phone, requiredPhoneProps)) {
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

        const requiredCustProps = ['_id', 'guid', 'isActive', 'name', 'company', 'email', 'phone', 'address', 'registered'];
        if (!validateRequiredProps(customer, requiredCustProps)) {
            return false;
        }

        if (!validateId(customer._id)) {
            return false;
        }

        const requiredNameProps = ['first', 'last'];
        if (!validateRequiredProps(customer.name, requiredNameProps)) {
            return false;
        }

        return true;
    };
};

exports.ValidationService = ValidationService;