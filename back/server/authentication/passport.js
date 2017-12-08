// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const validate = require('express-validation');
// const validation = require('../validation/authentication.js');
// const SessionStore = require('connect-mongo')(session);
// const mongoose = require('mongoose');

// const router = express.Router();

// function init(app) {
//   app.use(session({
//     secret: 'SourCat',
//     resave: false,
//     saveUninitialized: false,
//     rolling: true,
//     name: 'sid',
//     cookie: { maxAge: 86400000 },
//     store: new SessionStore({
//       url: 'mongodb://localhost/sessions',
//     }),
//   }));
//   app.use(passport.initialize());
//   app.use(passport.session());
// }

// const userSchema = mongoose.Schema({
//   login: {
//     type: String,
//     unique: true,
//     required: true,
//     index: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });


// const userConnection = mongoose.createConnection('mongodb://localhost/users');
// const dbUser = userConnection.model('User', userSchema);

// passport.use(new LocalStrategy({
//   usernameField: 'login',
//   passwordField: 'password' },
//   (login, password, done) => {
//     dbUser.findOne({ login: login.toLocaleLowerCase() })
//     .then((user) => {
//       if (!user) {
//         return done(null, false, { message: 'No such user.' });
//       }
//       if (user.password !== password) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     })
//     .catch(error => done(error));
//   }));

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });
// passport.deserializeUser((id, done) => {
//   dbUser.findById(id)
//   .then((res, rej) => {
//     done(rej, res);
//   });
// });

// router.post('/login', validate(validation.login), (req, res) => {
//   passport.authenticate('local', (autError, user, result) => {
//     if (autError) {
//       return res.status(500).send(autError.message);
//     }
//     if (!user) {
//       return res.status(400).send(result.message);
//     }

//     req.logIn(user, (logError) => {
//       if (logError) {
//         return res.status(403).send(logError.message);
//       }
//       res.status(202).send(user.login);
//     });
//   })(req, res);
// });

// router.post('/exit', validate(validation.exit), (req, res) => {
//   if (!req.user) {
//     res.status(401).end();
//     return;
//   }
//   req.session.destroy((err) => {
//     if (err) {
//       res.send(err.message);
//       throw err;
//     }
//     res.end();
//   });
// });

// module.exports = {
//   router,
//   init,
// };
