const router = require('express').Router();

router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/someRoute', require('./someRoute')); // matches all requests to  /api/someRoute/
router.use('/someOtherRoute', require('./someOtherRoute')); // matches all requests to  /api/someOtherRoute/



router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});


module.exports = router;