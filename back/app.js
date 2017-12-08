const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const async = require('async');

// const authentication = require('./server/authentication/passport');
const sneakers = require('./server/routes/sneakers');
const utils = require('./utils');

const app = express();

// authentication.init(app);

app.set('port', (process.env.PORT || 1337));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true,
}));

// app.use('/api/authentication/', authentication.router);
app.use('/api/sneakers/', sneakers);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/', (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).end();
//   }
//   next();
// });

// app.get('/api/user', (req, res) => {
//   const user = req.user;
//   delete user.login;
//   res.status(200).send(utils.toCamel(user));
// });

app.get('/', (req, res) => {
  res.send('HELLOY');
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).json(err);
  next();
});
process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

app.listen(app.get('port'), () => console.log('Server is running on port', app.get('port')));
