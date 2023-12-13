import Controller from '../Controller';
import Message from './message-model';
import MessageService from './message-service';

const messageService = new MessageService(new Message().getInstance());

class MessageController extends Controller {
  constructor(service) {
    super(service);
    this.sendMessage = this.sendMessage.bind(this);
    this.getRoomMessage = this.getRoomMessage.bind(this);
  }

  async sendMessage(req, res) {
    const response = await this.service.insert({
      ...req.body,
      sender: req.user.id,
    });

    return res.status(response.statusCode).send(response);
  }

  async getRoomMessage(req, res) {
    const response = await this.service.getAllWithCondition({roomId: req.params.roomId});

    return res.status(response.statusCode).send(response);
  }
}

export default new MessageController(messageService);
