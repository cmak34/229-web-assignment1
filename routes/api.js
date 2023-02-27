let express = require('express');
let router = express.Router();
const User = require('../models/user')
const Contact = require('../models/contact')
const bcrypt = require('bcryptjs');
const passport = require('passport');

function validateEmail(username) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(username);
}

function validatePassword(password) {
    return password.length >= 8;
}

router.post('/logout', (req, res, next) => {
    req.logout(() => {
        res.status(200).json({ success: true })
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(401).json({
                responseJSON: {
                    error: 'Incorrect username or password.'
                }
            }
            );
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.status(200).json({
                success: true
            });
        });
    })(req, res, next);
});

router.post('/signup', (req, res, next) => {
    const username = req.body.username?.trim()?.toLowerCase() || "";
    const password = req.body.password?.trim() || "";

    // Validate the username and password before creating the account
    if (!validateEmail(username)) {
        return res.status(401).json({
            responseJSON: {
                error: 'Invalid username. Please enter a valid email address.'
            }
        });
    }
    if (!validatePassword(password)) {
        return res.status(401).json({
            responseJSON: {
                error: 'Invalid password. Password must be at least 8 characters long.'
            }
        });
    }
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err)
            return next(err);
        }
        if (user) {
            return res.status(401).json({
                responseJSON: {
                    error: 'Username already exists'
                }
            });
        } else {
            const newUser = new User({
                username: username,
                password: bcrypt.hashSync(password, 10),
                email: username,
                displayName: username
            });
            newUser.save((err) => {
                console.log(err)
                if (err) {
                    return next(err);
                }
                req.logIn(newUser, (err) => {
                    if (err) { return next(err); }
                    return res.status(200).json({
                        success: true
                    });
                });
            });
        }
    });
});

router.get('/contact', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            responseJSON: {
                error: 'Forbidden'
            }
        });
    } else {
        Contact.find({}).sort({ contactName: 1 }).exec((err, result) => {
            if (err) {
                return res.status(401).json({
                    responseJSON: {
                        error: `${err}`
                    }
                });
            } else {
                return res.status(200).json({
                    success: true,
                    contacts: result || []
                });
            }
        });
    }
});

router.post('/contact', (req, res, next) => {
    const contactName = req.body.contactName?.trim() || "";
    const contactNumber = req.body.contactNumber?.trim() || "";
    const email = req.body.email?.trim()?.toLowerCase() || "";
    const id = req.body.id?.trim() || "";

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            responseJSON: {
                error: 'Forbidden'
            }
        });
    } else if (!validateEmail(email)) {
        return res.status(401).json({
            responseJSON: {
                error: 'Incorrect email format'
            }
        });
    } else if (email == "" || contactName == "" || contactNumber == "") {
        return res.status(401).json({
            responseJSON: {
                error: 'All the fields are required'
            }
        });
    } else if (id == "") {
        const newContact = new Contact({
            contactName: contactName,
            contactNumber: contactNumber,
            email: email
        });
        newContact.save((err) => {
            console.log(err)
            if (err) {
                return res.status(401).json({
                    responseJSON: {
                        error: `${err}`
                    }
                });
            } else {
                Contact.find({}).sort({ contactName: 1 }).exec((err, result) => {
                    if (err) {
                        return res.status(401).json({
                            responseJSON: {
                                error: `${err}`
                            }
                        });
                    } else {
                        return res.status(200).json({
                            success: true,
                            contacts: result || []
                        });
                    }
                });
            }
        });
    } else {
        Contact.findByIdAndUpdate(id, {
            contactName: contactName,
            contactNumber: contactNumber,
            email: email
        }, { new: false }, (err, _result) => {
            if (err) {
                return res.status(401).json({
                    responseJSON: {
                        error: `${err}`
                    }
                });
            } else {
                Contact.find({}).sort({ contactName: 1 }).exec((err, result) => {
                    if (err) {
                        return res.status(401).json({
                            responseJSON: {
                                error: `${err}`
                            }
                        });
                    } else {
                        return res.status(200).json({
                            success: true,
                            contacts: result || []
                        });
                    }
                });
            }
        });
    }
});

router.delete('/contact', (req, res, next) => {
    const id = req.body.id?.trim() || "";
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            responseJSON: {
                error: 'Forbidden'
            }
        });
    } else if (id == "") {
        return res.status(401).json({
            responseJSON: {
                error: 'Invalid id'
            }
        });
    } else {
        Contact.findByIdAndDelete(id, (err, _result) => {
            if (err) {
                return res.status(401).json({
                    responseJSON: {
                        error: `${err}`
                    }
                });
            } else {
                Contact.find({}).sort({ contactName: 1 }).exec((err, result) => {
                    if (err) {
                        return res.status(401).json({
                            responseJSON: {
                                error: `${err}`
                            }
                        });
                    } else {
                        return res.status(200).json({
                            success: true,
                            contacts: result || []
                        });
                    }
                });
            }
        })
    }
});

module.exports = router;