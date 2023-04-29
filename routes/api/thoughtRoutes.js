const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
} = require("../../controllers/thoughtController.js");

// API route - > /api/thoughts
router.route("/").get(getThoughts); //.post(createThought);

// API route - > /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);

module.exports = router;
