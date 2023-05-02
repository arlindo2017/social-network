const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .populate("thoughts")
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .select("-__v")
      .then(async (user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          res.json({ user });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Update an existing user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          res.json({ user });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          return Thought.deleteMany({ _id: { $in: user.thoughts } });
        }
      })
      .then(() => {
        res.json({ message: "User and associated thoughts were deleted!" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Add a friend's ID to a user's friend list
  updateFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          res.json({ user });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Remove a friend's ID from a user's friend list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        } else {
          res.json({ user });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
