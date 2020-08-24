const router = require("express").Router();
module.exports = router;

router.use("/conditions", require("./conditions"));
router.use("/users", require("./users"));
router.use("/medications", require("./medications"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});