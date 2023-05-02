const router = require("express").Router();
const apiRoutes = require("./api");

//Define API route
router.use("/api", apiRoutes);

router.use((req, res) => res.send("Wrong route!"));

module.exports = router;
