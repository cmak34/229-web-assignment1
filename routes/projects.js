const express = require("express");
const router = express.Router();
const constant = require("../config/constant")

/**
 * Project page
 */
router.get("/", (_req, res, _next) => {
  res.render("pages/projects", {
    title: `${constant.siteName} | Projects`,
    version: constant.version,
    lastUpdated: constant.lastUpdated
  });
});

module.exports = router;
