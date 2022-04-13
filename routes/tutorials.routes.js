const router = require("express").Router();
const tutorials = require("../controllers/tutorials.controller");

router.post("/", tutorials.create);
router.get("/", tutorials.findAll);
router.get("/:id", tutorials.findOne);
router.get("/published", tutorials.findAllPublished);
router.put("/:id", tutorials.update);
router.delete("/:id", tutorials.delete);
router.delete("/", tutorials.deleteAll);

module.exports = router;
