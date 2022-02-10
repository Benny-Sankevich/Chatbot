import { MainStateInterface } from '../index';
import { ActionTree } from 'vuex';
import { ChatsStateInterface, Msg } from './models';
import { AppConstants } from 'src/core/AppConstants';
import { httpClient } from 'src/utils/http-client';

const actions: ActionTree<ChatsStateInterface, MainStateInterface> = {
  [AppConstants.Chats.ActionClearMsg]: (context): void => {
    context.commit(AppConstants.Chats.MutationClearMsg);
  },
  [AppConstants.Chats.ActionLoadHistoryChats]: (
    context
  ): Promise<void | Msg[]> => {
    return httpClient.post('chats/get-all-chats').then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Chats.MutationSetHistoryChats,
          response.data as Msg[]
        );
      }
    });
  },
};

export default actions;
