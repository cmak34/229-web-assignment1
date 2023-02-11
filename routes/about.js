const express = require("express");
const router = express.Router();
const constant = require("../config/constant")

/**
 * About page
 */
router.get("/", (_req, res, _next) => {
  res.render("pages/about", {
    title: `${constant.siteName} | About me`,
    version: constant.version,
    lastUpdated: constant.lastUpdated
  });
});

module.exports = router;