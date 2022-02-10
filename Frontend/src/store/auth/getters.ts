import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '../index';
import { AuthStateInterface, AuthUser } from './models';

const getters: GetterTree<AuthStateInterface, MainStateInterface> = {
  [AppConstants.Auth.GetAuthUser]: (state): AuthUser => {
    return state.user;
  },
};
export default getters;
