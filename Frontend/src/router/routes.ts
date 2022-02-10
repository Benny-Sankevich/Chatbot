import { RouteRecordRaw } from 'vue-router';
import { AppConstants, showError } from '../core/Export';
import { appStore } from '../store/index';
import LoginPage from '../pages/LoginPage.vue';
import MainLayout from '../layouts/MainLayout.vue';
import ChatRoomPage from '../pages/ChatRoomPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: AppConstants.Routes.Login,
        component: LoginPage,
      },
      {
        beforeEnter: (to, from, next) => {
          const user =
            appStore.getters[
              `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
            ];
          if (!user) {
            showError('You Are Not Logged In');
            return next('/');
          }
          return next();
        },
        path: 'chat',
        name: AppConstants.Routes.ChatRoomPage,
        component: ChatRoomPage,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
