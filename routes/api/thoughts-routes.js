//create the API-specific route for user-routes
const router = require('express').Router();
//import functionality and hook it up with routes
const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/thoughts-controller');

// Set up GET all and POST at /api/user
// /api/pizzas
router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts);

// Set up GET one, PUT, and DELETE at /api/user/:id
// /api/user/:id
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

//Set up Get one, PUT, and DELETE at /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;