'use strict';

module.exports = function(app) {

  // Load and mount handlers/routers
  app.use('/', require('../routes/index'));
  app.use('/posts', require('../routes/posts'));
  app.use('/admin', checkAuth, require('../routes/admin'));

  // Send 404
  app.use(function(req, res) {
    res.status(404).render('404');
  });
};

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'Please log in to access that page.');
    res.redirect('/login');
  }
}
