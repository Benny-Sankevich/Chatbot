import { Msg } from '../store/chats/models';
import { httpClient } from '../utils/http-client';

class ApiService {
  addChatMessage(payload: Msg): Promise<void> {
    return httpClient.post('chats/add-chat', payload);
  }
  addReplayChatMessage(payload: Msg): Promise<void> {
    return httpClient.post('chats/add-replayed-chat', payload);
  }
}
export const apiService = new ApiService();
