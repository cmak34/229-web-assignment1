const express = require("express");
const router = express.Router();
const constant = require("../config/constant")

/**
 * Contact page
 */
router.get("/", (_req, res, _next) => {
  res.render("pages/contact", {
    title: `${constant.siteName} | Contact me`,
    version: constant.version,
    lastUpdated: constant.lastUpdated
  });
});

module.exports = router;
