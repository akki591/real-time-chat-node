import express from 'express';
import userRoutes from '../app/user/user-route';
import messageRoutes from '../app/message/message-route';
import roomRoutes from '../app/room/room-route';

const router = express.Router();

userRoutes(router);
messageRoutes(router);
roomRoutes(router);

export default router;
