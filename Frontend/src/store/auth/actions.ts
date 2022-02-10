import { AppConstants } from '../../core/Export';
import { MainStateInterface } from '../index';
import { ActionTree } from 'vuex';
import { AuthStateInterface, AuthUser } from './models';

const actions: ActionTree<AuthStateInterface, MainStateInterface> = {
  [AppConstants.Auth.ActionAuthLoggedIn]: (
    context,
    payload: AuthUser
  ): void => {
    context.commit(AppConstants.Auth.MutationAuthLoggedIn, payload);
  },

  [AppConstants.Auth.ActionAuthLoggedOut]: (
    context,
    payload: AuthUser
  ): void => {
    context.commit(AppConstants.Auth.MutationAuthRemove, payload);
  },
};

export default actions;
