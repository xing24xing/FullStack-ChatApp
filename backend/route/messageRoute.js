import express from 'express';
import { sendMessage, getMessage, deleteMessage } from '../controllers/messageController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

// Protect the send and get message routes with authentication
router.route('/send/:id').post(isAuth, sendMessage);
router.route('/:id').get(isAuth, getMessage);
router.route('/delete/:messageId').delete(isAuth, deleteMessage);


export default router;
