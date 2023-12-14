import auth from '../middleware/auth.middleware';
import UserController from './user-controller';

export default (router) => {
  router.post('/api/login', UserController.loginUser);
  router.get('/api/user/:id', auth, UserController.get);
  router.post('/api/user/create', UserController.addUser);
  router.get('/api/users', auth, UserController.getAll);
  // router.put('/api/user/:id', auth, UserController.update);
};
