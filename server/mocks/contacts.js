module.exports = function(app) {
  var express = require('express');
  var contactsRouter = express.Router();

  contactsRouter.get('/', function(req, res) {
    res.send({
      'contacts': [{
          id: 1,
          firstName: 'Andrea',
          lastName: 'Schnock',
          address: 'Waldstr. 21, 13156 Berlin',
          email: 'andrea@meineschnocks.de'
      }]
    });
  });

  contactsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  contactsRouter.get('/:id', function(req, res) {
    // res.send({
    //   'contacts': {
    //     id: req.params.id
    //   }
    // });
    res.send({
      'contact': {
          id: 1,
          firstName: 'Andrea',
          lastName: 'Schnock',
          address: 'Waldstr. 21, 13156 Berlin',
          email: 'andrea@meineschnocks.de'
      }
    });
  });

  contactsRouter.put('/:id', function(req, res) {
    res.send({
      'contacts': {
        id: req.params.id
      }
    });
  });

  contactsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/contacts', contactsRouter);
};
