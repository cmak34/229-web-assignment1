const express = require('express');
const router = express.Router();

/**
 * Home page
 */
router.get('/', (_req, res, _next) => {
  res.redirect(301, '/');
});

module.exports = router;