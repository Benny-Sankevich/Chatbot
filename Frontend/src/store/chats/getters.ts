import { ChatsStateInterface, Msg } from './models';
import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '../index';

const getters: GetterTree<ChatsStateInterface, MainStateInterface> = {
  [AppConstants.Chats.GetChats]: (state): Array<Msg> => {
    return state.messages;
  },
  [AppConstants.Chats.GetMessageToReplay]: (state): Msg => {
    return state.messageToReplay;
  },
};
export default getters;
