import express from 'express';
import * as authController from '../controllers/authController.js';
import verifyUser from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/users', authController.users);
router.post('/api-chat', authController.apichat);
router.get('/', verifyUser, (req, res) => {
    return res.json({Status: "success", name: req.name});
});

export default router;