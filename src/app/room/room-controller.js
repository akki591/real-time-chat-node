import Controller from '../Controller';
import RoomService from './room-service';
import Room from './room-model';
import Message from '../message/message-model';

const roomService = new RoomService(new Room().getInstance());

class RoomController extends Controller {
  constructor(service) {
    super(service);
    this.message = new Message().getModel();
    this.createRoom = this.createRoom.bind(this);
  }

  async createRoom(req, res) {
    const { user, message } = req.body;

    const data = {
      users: [user, req.user.id],
    };

    const roomRes = await this.service.insert(data);
    if (roomRes.error) res.status(roomRes.statusCode).send(roomRes);

    const chatData = {
      message,
      receiver: user,
      sender: req.user.id,
      roomId: roomRes.item.id,
    };

    await this.message.create(chatData);

    return res.status(roomRes.statusCode).send(roomRes);
  }

  async getAll(req, res) {
    const response = await this.service.getAll(req.user.id);

    return res.status(response.statusCode).send(response);
  }
}

export default new RoomController(roomService);
