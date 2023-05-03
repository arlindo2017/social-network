const { json } = require("express");
const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        if (thoughts.length === 0) {
          return res.status(404).json({ message: "No thoughts found" });
        }
        res.json(thoughts);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with that ID" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Create a new Thought and add thought to user thoughts

  createThought(req, res) {
    Thought.create(req.body)
      .then((createdThought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: createdThought._id } },
          { new: true }
        ).then(() => {
          res.json(createdThought);
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this id!" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID" });
        } else {
          res.json({ message: "Thought deleted!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  // Add reaction to thought by ID
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((createdReaction) => {
        if (!createdReaction) {
          res
            .status(404)
            .json({ message: "No thought with that ID was found!" });
        } else {
          User.findOneAndUpdate(
            { _id: createdReaction.userId },
            { $addToSet: { thoughts: createdReaction._id } },
            { new: true }
          );
        }
        return res.json(createdReaction);
      })

      .catch((err) => res.status(500).json(err));
  },

  // Delete reaction by reaction ID
  deleteReaction(req, res) {
    // First, check if the reaction ID exists in the thought's reactions array
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
        reactions: { $elemMatch: { reactionId: req.params.reactionId } },
      },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No reaction with that ID" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};
