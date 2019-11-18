'use strict';

const ValidationService = function () {

    this.isValidAgent = function (agent) {
        if (!agent) {
            return false;
        }

        const agentProps = ['_id', 'name', 'address', 'city', 'state', 'zipCode', 'tier', 'phone'];
        for (let p of agentProps) {
            if (!agent[p]) {
                return false;
            }
        }

        if (!Number.isInteger(agent._id)) {
            return false;
        }

        const phoneProps = ['primary', 'mobile'];

        for (let p of phoneProps) {
            if (!agent.phone[p]) {
                return false;
            }
        }

        return true;
    };
};

exports.ValidationService = ValidationService;