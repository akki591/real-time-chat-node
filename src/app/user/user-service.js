import Service from '../Service';

class UserService extends Service {
  constructor(model) {
    super(model);
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(username) {
    try {
      const item = await this.model.findOne({ username });
      if (!item) {
        return {
          error: true,
          statusCode: 400,
          message: 'Invalid Username or Password!',
        };
      }
      return {
        error: false,
        statusCode: 200,
        data: item,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors,
      };
    }
  }
}

export default UserService;
