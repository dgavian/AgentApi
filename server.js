'use strict';

const express = require('express'),
    app = express(),
    port = process.env.port || 3000,
    routes = require('./api/routes/agentApiRoutes');

app.use(express.json());
app.use(express.static('public'));

routes(app);

app.listen(port);

console.log(`Agent api started on port ${port}`);