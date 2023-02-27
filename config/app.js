const path = require('path');
const express = require('express');
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('../routes/index');
const apiRouter = require('../routes/api');
const homeRouter = require('../routes/home');
const aboutRouter = require('../routes/about');
const projectsRouter = require('../routes/projects');
const serviceRouter = require('../routes/service');
const contactRouter = require('../routes/contact');
const dashboardRouter = require('../routes/dashboard');
const { error404Route, errorOthersRoute } = require('../routes/error');
const app = express();
const User = require('../models/user');
const Contact = require('../models/contact');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

// connect to mongo db
const db = require("./db")
db.connect().then()
.then(() => console.log('Mongo db connected!'))
.catch((err) => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// default settings for express
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
    secret: "centcol",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, '../public')));
passport.use('local-login', new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return done(null, false, {
                message: `${err}`
            });
        } else if (!user) {
            return done(null, false, {
                message: 'username or password is incorrect'
            });
        } else {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    return done(null, false, {
                        message: 'user or password is incorrect'
                    });
                } else if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'user or password is incorrect'
                    })
                }
            });
        }
    });
}));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error')
    next();
});

// route
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/service', serviceRouter);
app.use('/projects', projectsRouter);
app.use('/contact', contactRouter);
app.use('/dashboard', dashboardRouter);
app.use(error404Route)
app.use(errorOthersRoute)

module.exports = app;