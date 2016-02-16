'use strict';

module.exports = configRoutes;

function configRoutes(app) {

  // Load and mount handlers/routers
  app.use('/', require('../routes/index'));
  app.use('/posts', require('../routes/posts'));
}
