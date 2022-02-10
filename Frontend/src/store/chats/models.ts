export interface ChatsStateInterface {
  messages: Array<Msg>;
  messageToReplay: Msg;
}
export class Msg {
  _id: string;
  username: string;
  avatar: string;
  message: string;
  replayedMessage: string;
  createdDate: string;
  isReplay: boolean;
}
