'use strict';

module.exports = function(app) {
    var getRouterFor = require('../fake-backend.js').getRouterFor;
    var contactsRouter = getRouterFor('contact', 'contacts');
    app.use('/api/contacts', contactsRouter);
};

