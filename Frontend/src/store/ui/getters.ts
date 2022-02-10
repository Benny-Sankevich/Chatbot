import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '../index';
import { UIStateInterface } from './models';

const getters: GetterTree<UIStateInterface, MainStateInterface> = {
  [AppConstants.Ui.GetIsFormDirty]: (state): boolean => {
    return state.isDirty;
  },

  [AppConstants.Ui.GetPendingRequestsCount]: (state): number => {
    return state.pendingHttpRequests.length;
  },

  [AppConstants.Ui.GetShowDialogStatus]: (state): boolean => {
    return state.showDialog;
  },
};

export default getters;
