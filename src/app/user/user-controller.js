import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Controller from '../Controller';
import User from './user-model';
import UserService from './user-service';

const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.addUser = this.addUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  async addUser(req, res) {
    const hash = await bcrypt.hash(req.body.password, 12);
    const response = await this.service.insert({ ...req.body, password: hash });
    return res.status(response.statusCode).send(response);
  }

  async loginUser(req, res) {
    // eslint-disable-next-line no-useless-catch
    try {
      const bodyPassword = req.body.password;
      delete req.body.password;
      const user = await this.service.loginUser(req.body.username);
      if (user.error) {
        return res.status(user.statusCode).send(user);
      }
      const isMatch = await bcrypt.compare(bodyPassword, user.data.password);
      if (isMatch) {
        const payload = {
          id: user.data._id,
          username: user.data.username,
          firstName: user.data.first_name,
          lastName: user.data.last_name,
          phoneNumber: user.data.phone_number,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 12,
        });

        const response = {
          error: false,
          statusCode: 200,
          token: accessToken,
          isAuthenticated: true,
          data: user.data,
        };
        return res.status(user.statusCode).send(response);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll(req, res) {
    const response = await this.service.getAllWithCondition({
      _id: { $ne: req.user.id },
    });
    return res.status(response.statusCode).send(response);
  }
}

export default new UserController(userService);
