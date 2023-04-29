const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  updateFriend,
  deleteFriend,
} = require("../../controllers/userController");

// API Route - >  /api/users
router.route("/").get(getUsers).post(createUser);

// API Route - >  /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// API Route - >  /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(updateFriend)
  .delete(deleteFriend);

module.exports = router;
