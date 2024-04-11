const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  signin,
  signup,
  updateInfo,
  filteringUser,
} = require("../controller/user");

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/", authMiddleware, updateInfo);
router.get("/bulk", authMiddleware, filteringUser);

module.exports = router;
