const express = require("express");
const router = express.Router();
const { getBalance, transferAmount } = require("../controller/account");

router.get("/balance", getBalance);
router.post("/transfer", transferAmount);

module.exports = router;
