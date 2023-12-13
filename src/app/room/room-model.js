import mongoose, { Schema } from 'mongoose';

class Room {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
      },
      {
        timestamps: true,
      },
    );
    mongoose.model('rooms', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('rooms');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('rooms');
  }
}

export default Room;
