'use strict';

const ValidationService = function () {

    const validateTopLevelProps = function (agent) {
        const agentProps = ['_id', 'name', 'address', 'city', 'state', 'zipCode', 'tier', 'phone'];
        for (let p of agentProps) {
            if (!agent[p]) {
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

    this.isValidAgent = function (agent) {
        if (!agent) {
            return false;
        }

        if (!validateTopLevelProps(agent)) {
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
};

exports.ValidationService = ValidationService;