const express = require("express");
const router = express.Router();

const { optimizeCode } = require("../controllers/optimizeController");

router.post("/optimize", optimizeCode);

module.exports = router;