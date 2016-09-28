'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('admin', {
    messages: req.flash('success'),
    authStatus: req.isAuthenticated()
  });
});

router.get('/settings', (req, res) => {
  res.render('admin/settings');
});

module.exports = router;
