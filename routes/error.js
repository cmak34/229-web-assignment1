const constant = require("../config/constant")

/**
 * Error page
 */

const error404Route = (_req, res, _next) => {
    res.status(404)
    res.render("pages/error", {
        title: `${constant.siteName} | 404 Page Not Found`,
        version: constant.version,
        lastUpdated: constant.lastUpdated
    })
};

const errorOthersRoute = (err, _req, res, _next) => {
    res.status(500)
    res.render("pages/error", {
        title: `${constant.siteName} | Internal Server Error`,
        error: err.message,
        version: constant.version,
        lastUpdated: constant.lastUpdated
    })
};

module.exports = { error404Route, errorOthersRoute }