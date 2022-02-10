import axios, { AxiosInstance } from 'axios';
import { Store } from 'vuex';
import { appStore, MainStateInterface } from '../store/index';
import { Loading, QSpinnerPuff } from 'quasar';
import { AppConstants, showError } from '../core/Export';

const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.baseApiUrl,
});
// Spinner interceptor
httpClient.interceptors.request.use((config) => {
  if (config.baseURL && config.url) {
    (appStore as Store<MainStateInterface>).commit(
      `${AppConstants.UiModule}/${AppConstants.Ui.MutationAddPendingRequest}`,
      config.baseURL + config.url
    );
  }

  Loading.show({
    spinner: QSpinnerPuff,
    spinnerColor: 'amber',
    spinnerSize: 40,
  });
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    (appStore as Store<MainStateInterface>).commit(
      `${AppConstants.UiModule}/${AppConstants.Ui.MutationRemovePendingRequest}`,
      `${response.config.baseURL}${response.config.url}`
    );

    const pendingRequestsCount = (appStore as Store<MainStateInterface>)
      .getters[
      `${AppConstants.UiModule}/${AppConstants.Ui.GetPendingRequestsCount}`
    ] as number;
    if (pendingRequestsCount === 0) {
      Loading.hide();
    }
    return response;
  },
  async (error) => {
    (appStore as Store<MainStateInterface>).commit(
      `${AppConstants.UiModule}/${AppConstants.Ui.MutationRemovePendingRequest}`,
      error.config.baseURL + error.config.url
    );
    const pendingRequestsCount = (await (appStore as Store<MainStateInterface>)
      .getters[
      `${AppConstants.UiModule}/${AppConstants.Ui.GetPendingRequestsCount}`
    ]) as number;
    if (pendingRequestsCount === 0) {
      Loading.hide();
    }
    showError(error.response?.data);
    return Promise.reject(error);
  }
);

export { httpClient };
