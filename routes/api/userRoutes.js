const router = require("express").Router();
const { getUsers, getSingleUser } = require("../../controllers/userController");

// API Route - >  /api/users
router.route("/").get(getUsers); //.post(createUser);

// API Route - >  /api/users/:userId
router.route("/:userId").get(getSingleUser); //.delete(deleteUser);

module.exports = router;
