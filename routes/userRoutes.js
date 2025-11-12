const express = require("express");
const {
  cadastrar,
  login,
  protected,
} = require("..//controllers/userController");
const authenticateToken = require("../middlewares/jtwMiddleware");

const router = express.Router();

router.post("/cadastrar", cadastrar);
router.post("/login", login);
router.get("/protected", authenticateToken, protected);

module.exports = router;
