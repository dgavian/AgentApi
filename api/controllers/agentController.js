'use strict';

const AgentController = function (serviceFactory) {

    const Validator = serviceFactory.makeValidator(),
        AgentRepo = serviceFactory.makeAgentRepo(),
        AgentService = serviceFactory.makeAgentService(Validator, AgentRepo),
        ResponseService = serviceFactory.makeResponseService();

    this.getAllAgents = function (req, res) {
        return AgentService.getAllAgents()
            .then(agents => res.json(agents))
            .catch(error => {
                const responseContent = ResponseService.getServerErrorResponse(res, error);
                res.json(responseContent);
            });
    };

    this.addAgent = function (req, res) {
        const requestBody = req.body;

        return AgentService.addAgent(requestBody)
            .then(() => {
                ResponseService.getCreatedResponse(req, requestBody._id, res);
                res.json(requestBody);
            })
            .catch(error => {
                const responseContent = ResponseService.getErrorResponse(error, res);
                res.json(responseContent);
            });
    };

    this.getAgent = function (req, res) {
        const agentId = parseInt(req.params.agentId, 10);
        return AgentService.getAgentById(agentId)
            .then(a => res.json(a))
            .catch(error => {
                const responseContent = ResponseService.getErrorResponse(error, res);
                res.json(responseContent);
            });
    };

    this.addOrUpdateAgent = function (req, res) {
        const requestBody = req.body;
        const agentId = parseInt(req.params.agentId, 10);
        return AgentService.addOrUpdateAgent(agentId, requestBody)
            .then(() => res.status(200).end())
            .catch(error => {
                const responseContent = ResponseService.getErrorResponse(error, res);
                res.json(responseContent);
            });
    };

};

exports.AgentController = AgentController;