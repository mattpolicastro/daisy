'use strict';

let About = require('../models').Post.scope('abouts');
let User = require('../models').User;

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('admin');
});

router.get('/settings', (req, res) => {
  User.findOne({
    where: { id: req.user.id },
    limit: 1
  }).then((user) => {
    res.render('admin/settings', {
      title: 'Settings',
      user: user
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).send('oops');
  });

  // About.findOne({
  //   where: { UserId: req.user.id },
  //   limit: 1,
  //   order: [['createdAt', 'DESC']]
  // }).then((about) => {
  //   res.render('admin/settings', {
  //     title: 'Settings',
  //     profile: about.contents.body
  //   });
  // }).catch((err) => {
  //   console.log(err);
  //   res.status(500).send(err);
  // });
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
  } else {
    res.status(400).send('Missing request body');
  }
});

router.post('/settings/password', (req, res) => {
  if (req.body) {
    User.findOne({
      where: {id: req.user.id },
      limit: 1
    }).then((user) => {
      if (user.passwordCheck(req.body.oldPassword)) {
        if (req.body.newPassword === req.body.confirmPassword) {

          let newPassword = user.passwordHash(password);

          user.update({ password: newPassword})
            .then(() => {
              req.flash('success', 'Password successfully updated.');
            })
            .catch()

          console.log(result);

          if (result) {
            req.flash('success', 'Password successfully updated.');
          } else {
            req.flash('error', 'Something went wrong—try again?');
          }

          res.redirect('/admin/settings');

        }
      }
    }).catch((err) => {
      console.log(err);
      req.flash('error', 'Something went wrong—try again?');
      res.redirect('/admin/settings');
    });
  } else {
    res.status(400).send('Missing request body');
  }
});



module.exports = router;
