const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const accountRouter = require("./account");
const authMiddleware = require("../middleware/authMiddleware");

router.use("/user", userRouter);
router.use("/account", authMiddleware, accountRouter);

module.exports = router;
