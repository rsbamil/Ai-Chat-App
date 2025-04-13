const { Router } = require("express");
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("email must be a valid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("password must be atleast 3 characters long"),
  userController.createUserController
);
router.post(
  "/login",
  body("email").isEmail().withMessage("email must be a valid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("password must be atleast 3 characters long"),
  userController.loginController
);
module.exports = router;
