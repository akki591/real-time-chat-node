import auth from '../middleware/auth.middleware';
import MessageController from './message-controller';

export default (router) => {
  router.get('/api/message/:id', auth, MessageController.get);
  router.post('/api/message/send', auth, MessageController.sendMessage);
  router.get('/api/room/:roomId/messages', auth, MessageController.getRoomMessage);
};
