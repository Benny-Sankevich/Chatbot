<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title> Chat Room </q-toolbar-title>

      <div v-if="user">{{ user.username }}</div>
      <q-space />
      <DownloadChatHistory v-if="user" />
      &nbsp;&nbsp;
      <AuthLogout v-if="user" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { AppConstants } from '../core/Export';
import { useStore } from '../store';

export default defineComponent({
  components: {
    AuthLogout: defineAsyncComponent(
      () => import('../components/auth/AuthLogout.vue')
    ),
    DownloadChatHistory: defineAsyncComponent(
      () => import('../components/chat/DownloadChatHistory.vue')
    ),
  },
  setup() {
    const store = useStore();
    const user = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );

    return { user };
  },
});
</script>
