import { Server } from 'socket.io';

class SocketManager {
  constructor(io, server) {
    this.io = io || new Server(server);
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.io) {
      this.io.on('connection', (socket) => {
        console.log('Socket.io Connected');

        socket.on('disconnect', () => {
          console.log('Socket.io Disconnected');
          this.io = null;
        });
      });
    }
  }

  emitEvent(eventName, data) {
    if (this.io) {
      this.io.emit(eventName, data);
    }
  }
}

export default SocketManager;
