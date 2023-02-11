const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('../routes/index');
// const apiRouter = require('../routes/api');
const homeRouter = require('../routes/home');
const aboutRouter = require('../routes/about');
const projectsRouter = require('../routes/projects');
const serviceRouter = require('../routes/service');
const contactRouter = require('../routes/contact');
const { error404Route, errorOthersRoute } = require('../routes/error');
const app = express();

// reserved for assignment 2 
// const db = require("./db")
// const mongoose = require('passport');
// connect to mongo db
// db.connect().then()
// .then(() => console.log('Mongo db connected!'))
// .catch((err) => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


// reserved for assignment 2 
// app.use(
//   session({
//     // secret: "this_is_a_secret",
//     store: pgSessionStorage,
//     resave: true,
//     saveUnitialized: true,
//     rolling: true, // forces resetting of max age
//     cookie: {
//       maxAge: 360000,
//       secure: false // this should be true only when you don't want to show it for security reason
//     }
//   })
// )
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
// app.post('/api(/*)?', apiRouter);
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/service', serviceRouter);
app.use('/projects', projectsRouter);
app.use('/contact', contactRouter);
app.use(error404Route)
app.use(errorOthersRoute)

module.exports = app;