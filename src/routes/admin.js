'use strict';

let About = require('../models').Post.scope('abouts');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('admin');
});

router.get('/settings', (req, res) => {
  About.findOne({
    where: { UserId: req.user.id },
    limit: 1,
    order: [['createdAt', 'DESC']]
  }).then((about) => {
    res.render('admin/settings', {
      title: 'Settings',
      profile: about.contents.body
    });
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.post('/settings/profile', (req, res) => {
  if (req.body) {
    About.create({
      status: 'published',
      slug: Date.now().toString(),
      summary: '',
      type: 'about',
      contents: {
        body: req.body.about
      },
      UserId: req.user.id
    }).then(() => {
      req.flash('success', 'Profile successfully updated');
      res.redirect('/admin/settings');
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
});



module.exports = router;
