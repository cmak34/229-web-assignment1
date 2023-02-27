const express = require("express");
const router = express.Router();
const constant = require("../config/constant")

/**
 * Index page
 */
router.get("/", (req, res, _next) => {
  res.render("pages/index", {
    title: `${constant.siteName} | Home`,
    version: constant.version,
    lastUpdated: constant.lastUpdated
  });
});

module.exports = router;