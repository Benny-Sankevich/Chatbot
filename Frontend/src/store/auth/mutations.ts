import { AuthStateInterface, AuthUser } from './models';
import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';

const mutation: MutationTree<AuthStateInterface> = {
  [AppConstants.Auth.MutationAuthLoggedIn]: (
    state,
    payload: AuthUser
  ): void => {
    state.user = payload;
    sessionStorage.setItem('user', JSON.stringify(state.user));
  },
  [AppConstants.Auth.MutationAuthRemove]: (state): void => {
    state.user = null;
    sessionStorage.removeItem('user');
  },
};

export default mutation;
