'use strict';

module.exports = function(app) {

  // Load and mount handlers/routers
  app.use('/', require('../routes/index'));
  app.use('/posts', require('../routes/posts'));

  // Send 404
  app.use(function(req, res) {
    res.status(404).render('404');
  });
}
