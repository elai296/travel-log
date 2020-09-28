const express = require('express');
const morgan = require('morgan'); //morgan will show in the terminal what HTTP method, status code, port, etch, it makes it easier to debug, in the video he explains at 17.03 mins
// https://www.youtube.com/watch?v=5pQsl9u_10M&t=587s
const helmet = require('helmet'); //this package hide the fact that you are using Express, so hackers don't know about Express, it's harder for them to hack, it prevents adding certain information to the header, like "X-Powered-By: Express", helmet will remove this property in the header
// https://helmetjs.github.io/
const cors = require('cors'); //this set * for the all origin in the header
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

app.enable('trust proxy'); // needed for rate limiting by Client IP

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound); //the other file
app.use(middlewares.errorHandler); //the other file

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


/* how to organize code, advice from cj from coding garden
- put middleware in one file
- put error handling in another file
- put route in another file
*/