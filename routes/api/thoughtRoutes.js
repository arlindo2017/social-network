const router = require("express").Router();
// const { up } = require("inquirer/lib/utils/readline.js");
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// API route - > /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// API route - > /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// API Route - >  /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// API Route - >  /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
