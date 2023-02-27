const express = require("express");
const router = express.Router();
const constant = require("../config/constant")
const Contact = require('../models/contact')

/**
 * Dashboard page
 */
router.get("/", (req, res, _next) => {
    if (req.isAuthenticated()) {
        Contact.find({}).sort({ contactName: 1 }).exec( (err, result) => {
            console.log(result)
            if (err) {
                req.flash('error', `${err}`);
            } 
            res.render("pages/dashboard", {
                title: `${constant.siteName} | Dashboard`,
                version: constant.version,
                lastUpdated: constant.lastUpdated,
                contacts: result || []
            });
        });
    } else {
        req.flash('error', 'You must be logged in to access this page.');
        res.redirect('/');
    }
});

module.exports = router;
