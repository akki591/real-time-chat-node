import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class User {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        firstName: {
          type: String,
          required: [true, 'First name is required.'],
        },
        lastName: {
          type: String,
          default: null,
        },
        username: {
          type: String,
          required: [true, 'Username is required.'],
          unique: true,
        },
        password: {
          type: String,
          required: [true, 'Password is required.'],
          default: null,
        },
      },
      {
        timestamps: true,
      },
    );
    schema.plugin(uniqueValidator, { message: 'Username must be unique' });
    mongoose.model('users', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('users');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('users');
  }
}

export default User;
