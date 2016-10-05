'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('admin');
});

router.get('/settings', (req, res) => {
  res.render('admin/settings');
});

module.exports = router;
