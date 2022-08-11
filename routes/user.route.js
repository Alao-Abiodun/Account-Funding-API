const {Router} = require('express');

const router = Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.post('/account', userController.createUserBankAccount);
router.get('/account/:id', userController.getUserBankAccount);

// A user can fund their account by sending a request to this endpoint with the amount to fund in the body.
router.post('/account/:id', userController.fundUserAccount);

module.exports.userRouter = router;

