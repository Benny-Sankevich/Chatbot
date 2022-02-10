import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';
import { AppConstants } from '../core/Export';
import { UIStateInterface } from './ui/models';
import { AuthStateInterface } from './auth/models';
import { ChatsStateInterface } from './chats/models';
import ui from './ui';
import auth from './auth';
import chats from './chats';

export interface MainStateInterface {
  [AppConstants.UiModule]: UIStateInterface;
  [AppConstants.AuthModule]: AuthStateInterface;
  [AppConstants.ChatModule]: ChatsStateInterface;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<MainStateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<MainStateInterface>> =
  Symbol('nails-vuex-key');

let appStore: any;
export default store(function (/* { ssrContext } */) {
  const Store = createStore<MainStateInterface>({
    modules: {
      [AppConstants.UiModule]: ui,
      [AppConstants.AuthModule]: auth,
      [AppConstants.ChatModule]: chats,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });
  appStore = Store;
  return Store;
});

export { appStore };

export function useStore() {
  return vuexUseStore(storeKey);
}
