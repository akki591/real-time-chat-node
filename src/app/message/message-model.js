import mongoose, { Schema } from 'mongoose';

class Message {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        message: {
          type: String,
          required: [true, 'Message is required.'],
        },
        sender: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        receiver: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          required: [true, 'Receiver is required.'],
        },
        isView: {
          type: Boolean,
          default: false,
        },
        roomId: {
          type: Schema.Types.ObjectId,
          ref: 'rooms',
          required: [true, 'Room Id is required'],
        },
      },
      {
        timestamps: true,
      },
    );
    mongoose.model('messages', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('messages');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('messages');
  }
}

export default Message;
