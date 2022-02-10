import { io, Socket } from 'socket.io-client';
import { appStore } from '../store/index';
import { AppConstants } from '../core/Export';

class SocketManager {
  private socket: Socket;

  public connect(): void {
    this.socket = io(process.env.baseSocketUrl);

    this.socket.on('chat', (message: string) => {
      appStore.commit(
        `${AppConstants.ChatModule}/${AppConstants.Chats.MutationAddMsg}`,
        message
      );
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}

export default SocketManager;

export const socketManagerInstance = new SocketManager();
