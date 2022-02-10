<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppConstants, socketManagerInstance } from './core/Export';
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const user = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );
    if (user.value) {
      socketManagerInstance.connect();
    }
  },
});
</script>
