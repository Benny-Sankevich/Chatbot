<template>
  <q-dialog v-model="show_dialog" persistent>
    <q-card style="width: 400px">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>Replay</q-toolbar-title>
        <q-btn
          flat
          round
          color="white"
          icon="close"
          @click="closeDialog(null)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="inset-shadow">
        <q-scroll-area style="height: 100px">
          <div class="caption">
            <p>{{ messageToReplay.message }}</p>
          </div>
        </q-scroll-area>
        <q-form @submit="onSendReplay" class="q-gutter-md">
          <q-input
            autofocus
            square
            clearable
            v-model="newMessage"
            type="textarea"
            placeholder="Please enter your replay"
            lazy-rules
            :rules="textRules"
          />
          <q-card-actions align="right">
            <q-btn
              unelevated
              type="submit"
              color="primary"
              class="text-white"
              label="Send"
              icon-right="send"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { apiService, AppConstants, textRules } from '../../core/Export';
import { useStore } from '../../store';
import { Msg } from '../../store/chats/models';

export default defineComponent({
  setup() {
    const store = useStore();
    const newMessage = ref(null);
    const show_dialog = computed(
      () =>
        store.getters[
          `${AppConstants.UiModule}/${AppConstants.Ui.GetShowDialogStatus}`
        ]
    );
    const messageToReplay = computed(() => {
      return store.getters[
        `${AppConstants.ChatModule}/${AppConstants.Chats.GetMessageToReplay}`
      ];
    });
    const user = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );

    const onSendReplay = (): void => {
      const msg = new Msg();
      msg.username = user.value.username;
      msg.avatar = user.value.avatar;
      msg.message = newMessage.value;
      msg.replayedMessage = messageToReplay.value.message;
      apiService.addReplayChatMessage(msg).then(() => {
        closeDialog();
      });
    };

    const closeDialog = (): void => {
      newMessage.value = null;
      store.commit(
        `${AppConstants.UiModule}/${AppConstants.Ui.MutationHideDialog}`
      );
    };
    return {
      textRules,
      newMessage,
      messageToReplay,
      show_dialog,
      closeDialog,
      onSendReplay,
    };
  },
});
</script>
