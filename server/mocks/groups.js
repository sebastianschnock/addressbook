'use strict';

module.exports = function(app) {
    var getRouterFor = require('../fake-backend.js').getRouterFor;
    var groupsRouter = getRouterFor('group', 'groups');
    app.use('/api/groups', groupsRouter);
};

