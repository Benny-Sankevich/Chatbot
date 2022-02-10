<template>
  <div>
    <ChatMessage
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :prev="index == 0 ? null : messages[index - 1]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType } from 'vue';
import { Msg } from '../../store/chats/models';

export default defineComponent({
  props: {
    messages: {
      type: Array as PropType<Msg[]>,
      required: true,
    },
  },
  components: {
    ChatMessage: defineAsyncComponent(() => import('./ChatMessage.vue')),
  },
});
</script>
