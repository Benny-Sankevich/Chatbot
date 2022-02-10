import { ChatsStateInterface, Msg } from './models';
import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';

const mutation: MutationTree<ChatsStateInterface> = {
  [AppConstants.Chats.MutationAddMsg]: (state, payload: Msg): void => {
    state.messages.push(payload);
  },
  [AppConstants.Chats.MutationClearMsg]: (state): void => {
    state.messages = [];
  },
  [AppConstants.Chats.MutationSetHistoryChats]: (
    state,
    historyMsg: Msg[]
  ): void => {
    state.messages = historyMsg;
  },
  [AppConstants.Chats.MutationSetMessageToReplay]: (
    state,
    payload: Msg
  ): void => {
    state.messageToReplay = payload;
  },
};

export default mutation;
