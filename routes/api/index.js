//import all of the API routes to prefix their endpoint names an package them up
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thoughts-routes');

// add prefixes of `/user` and '/thoughts' to routes created in `user-routes.js`and `thoughts-routes.js`
router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;