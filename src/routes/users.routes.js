const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controller");

router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
