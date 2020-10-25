require('dotenv').config();

const express = require('express');
const server = express();
const mongoose = require('mongoose');

// CONNECTING TO DATABASE
mongoose.connect(process.env.CONNECTIONSTRING, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false })
  .then(() => {
    server.emit('connected');
  })
  .catch(err => console.log(err));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const path = require('path');
const helmet = require('helmet')
const csrf = require('csurf');
const routes = require('./routes');
const { globalMiddleware, checkAnyError, csrfMiddleware } = require('./src/middlewares/myMiddleware');

// MIDDLEWARES
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.resolve(__dirname, 'public')));

// SESSION CONFIGURATION
const sessionOptions = session({
  secret: 'sjasdhsd;ldkk  dhdjshsda dsjshdasalkhg',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

// MIDDLEWARES
server.use(sessionOptions);
server.use(flash());
server.set('views', path.resolve(__dirname, 'src', 'views'));
server.set('view engine', 'ejs');
server.use(csrf());

// MY MIDDLEWARES
server.use(globalMiddleware);
server.use(checkAnyError);
server.use(csrfMiddleware);

// ROUTES MIDDLEWARE
server.use(routes);

// SERVER WILL ONLY START AFTER THE DATABASE CONNECTION ON LINE 13
server.on('connected', () => {
  server.listen(3000);
});