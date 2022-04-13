const router = require("express").Router();

router.use("/tutorials", require("./tutorials.routes"));

module.exports = router;
