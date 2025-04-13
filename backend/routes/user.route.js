const { Router } = require("express");
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");
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
router.get(
  "/profile",
  authMiddleware.authUser,
  userController.profileController
);
router.get("/logout", authMiddleware.authUser, userController.logoutController);
module.exports = router;
