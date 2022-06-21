const express = require('express');
const authcontrollear = require('./controllers');
const checkAuth = require('../../middlewares/checkAuth');
const router = express.Router();

router.post('/create-user', authcontrollear.createUser);
router.post('/login', authcontrollear.login);
router.post('/forgot-password', authcontrollear.forgotPassword);
router.post('/change-password', checkAuth, authcontrollear.changePassword);
router.post('/logout', checkAuth, authcontrollear.logout);
router.post('/check-user-login', checkAuth, authcontrollear.checkIsUserLogin);

module.exports = router;