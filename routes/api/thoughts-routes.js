//create the API-specific route for user-routes
const router = require('express').Router();
//import functionality and hook it up with routes
const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughts-controller');

// Set up GET all and POST at /api/thoughts
// /api/pizzas
router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
// /api/user/:id
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

//Set up Get one, PUT, and DELETE at /api/users/:thoughtsId/reaction
router
    .route('/:thougtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;