// apiRoutes/someOtherRoute.js
const router = require('express').Router();

// matches GET requests to /api/someOtherRoute/
router.get('/', function (req, res, next) { /* etc */});

// matches POST requests to /api/someOtherRoute/
router.post('/', function (req, res, next) { /* etc */});

// matches PUT requests to /api/someOtherRoute/:someOtherId
router.put('/:someOtherId', function (req, res, next) { /* etc */});

// matches DELETE requests to /api/someOtherRoute/:someOtherId
router.delete('/:someOtherId', function (req, res, next) { /* etc */});

module.exports = router;