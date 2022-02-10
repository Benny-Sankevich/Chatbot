<template>
  <q-btn @click="getHistory" flat round dense icon="history" size="sm">
    <q-tooltip>Get history</q-tooltip>
  </q-btn>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../store';
import { AppConstants } from '../../core/Export';

export default defineComponent({
  setup() {
    const store = useStore();
    const getHistory = (): void => {
      store.dispatch(
        `${AppConstants.ChatModule}/${AppConstants.Chats.ActionLoadHistoryChats}`
      );
    };
    return {
      getHistory,
    };
  },
});
</script>
