const express = require("express");
const router = express.Router();
const constant = require("../config/constant")

/**
 * Service page
 */
router.get("/", (_req, res, _next) => {
  res.render("pages/service", {
    title: `${constant.siteName} | Service`,
    version: constant.version,
    lastUpdated: constant.lastUpdated
  });
});

module.exports = router;
