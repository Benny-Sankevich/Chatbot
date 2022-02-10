<template>
  <q-page class="flex column">
    <q-input
      class="text-center bg-grey-4 fixed-top"
      dense
      rounded
      outlined
      v-model="search"
      @keyup="searchMessage"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <div class="q-pa-md bg-grey-4 column col justify-end">
      <ChatList :messages="messagesList" />
      <ChatReplay />
    </div>
    <q-footer elevated>
      <ChatForm />
    </q-footer>
  </q-page>
</template>
<script lang="ts">
import {
  defineComponent,
  defineAsyncComponent,
  computed,
  ref,
  watch,
} from 'vue';
import { AppConstants, functionsService } from '../core/Export';
import { useStore } from '../store';
import { Msg } from '../store/chats/models';

export default defineComponent({
  components: {
    ChatList: defineAsyncComponent(
      () => import('../components/chat/ChatList.vue')
    ),
    ChatForm: defineAsyncComponent(
      () => import('../components/chat/ChatForm.vue')
    ),
    ChatReplay: defineAsyncComponent(
      () => import('../components/chat/ChatReplay.vue')
    ),
  },
  setup() {
    const store = useStore();
    const search = ref('');
    const messages = computed(
      () =>
        store.getters[
          `${AppConstants.ChatModule}/${AppConstants.Chats.GetChats}`
        ]
    );
    const messagesList = ref(messages.value);

    watch(messages, (): void => {
      messagesList.value = messages.value;
    });

    const searchMessage = (): void => {
      messagesList.value = functionsService.getMessagesSearchResult(
        search.value,
        messages.value as Msg[]
      );
    };
    return {
      search,
      messagesList,
      searchMessage,
    };
  },
});
</script>
<style scoped>
.q-input {
  top: 50px;
  z-index: 2;
  opacity: 0.7;
}
</style>
