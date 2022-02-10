<template>
  <q-btn @click="logout" flat round dense icon="logout" size="sm">
    <q-tooltip>Logout</q-tooltip>
  </q-btn>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../store';
import {
  AppConstants,
  showInfo,
  socketManagerInstance,
} from '../../core/Export';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = (): void => {
      store
        .dispatch(
          `${AppConstants.AuthModule}/${AppConstants.Auth.ActionAuthLoggedOut}`
        )
        .then(() => {
          socketManagerInstance.disconnect();
          showInfo('You have been logout');
          router.push({ name: AppConstants.Routes.Login });
          store.dispatch(
            `${AppConstants.ChatModule}/${AppConstants.Chats.ActionClearMsg}`
          );
        });
    };
    return {
      logout,
    };
  },
});
</script>
