// apiRoutes/someRoute.js
const router = require('express').Router();

// matches GET requests to /api/someRoute/
router.get('/', function (req, res, next) { /* etc */});

// matches POST requests to /api/someRoute/
router.post('/', function (req, res, next) { /* etc */});

// matches PUT requests to /api/someRoute/:someRouteId
router.put('/:someRouteId', function (req, res, next) { /* etc */});

// matches DELETE requests to /api/someRoute/:someRouteId
router.delete('/:someRouteId', function (req, res, next) { /* etc */});

module.exports = router;