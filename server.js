'use strict';

const express = require('express'),
    app = express(),
    port = process.env.port || 3000;

app.listen(port);

console.log(`Agent api started on port ${port}`);