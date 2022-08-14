const { Router } = require("express");

const router = Router();

const userController = require("../controllers/user.controller");

const { isAuthenticated } = require("../middleware/auth.middleware");

router.get("/", userController.getAllUsers);

router.post("/account", isAuthenticated, userController.createUserBankAccount);

router.get("/account", isAuthenticated, userController.getUserBankAccount);

// A user can fund their account by sending a request to this endpoint with the amount to fund in the body.
router.post(
  "/account/:id/fund",
  isAuthenticated,
  userController.fundUserAccount
);

router.post(
  "/:sender_id/account/:reciever_id/transfer",
  isAuthenticated,
  userController.transferFundsToUserAccount
);

router.put("/account/withdraw", isAuthenticated, userController.withdrawFunds);

module.exports.userRouter = router;
