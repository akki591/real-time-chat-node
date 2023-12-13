import auth from '../middleware/auth.middleware';
import RoomController from './room-controller';

export default (router) => {
  router.get('/api/room/:id', auth, RoomController.get);
  router.get('/api/rooms', auth, RoomController.getAll);
  router.post('/api/room/create', auth, RoomController.createRoom);
};
