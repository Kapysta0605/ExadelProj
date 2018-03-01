const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sneakers = require('./server/routes/sneakers');

const app = express();

app.set('port', (process.env.PORT || 1337));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use('/api', sneakers);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).json(err);
  next();
});
process.on('uncaughtException', error => console.log(`Caught exception: ${error.stack}`));

app.listen(app.get('port'), () => console.log('Server is running on port', app.get('port')));
