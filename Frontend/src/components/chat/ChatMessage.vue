<template>
  <div>
    <div class="text-center text-subtitle2" v-if="date">{{ date }}</div>
    <div
      v-if="isCurrentUser"
      class="chat_message"
      :class="[isSamePersonSentPrevAndCurrent ? '' : 'chat_first']"
    >
      <p class="chat_your_message_time">
        {{ functionsService.getTime(message.createdDate) }}
      </p>
      <p class="chat_message_paragraph">
        <span v-if="message.isReplay" class="bg-yellow-2 text-bold">{{
          message.replayedMessage
        }}</span>
        <q-separator v-if="message.isReplay" color="red" />{{ message.message }}
      </p>
    </div>
    <div
      v-else
      class="chat_your_message"
      :class="[isSamePersonSentPrevAndCurrent ? '' : 'chat_first']"
    >
      <div class="chat_your_message_avatar">
        <q-avatar color="primary" text-color="white"
          >{{ message.avatar }}
        </q-avatar>
      </div>
      <div>
        <p
          class="chat_your_message_user"
          v-if="!isSamePersonSentPrevAndCurrent"
        >
          {{ message.username }}
        </p>
        <div class="chat_your_message_p">
          <p class="chat_your_message_paragraph">
            <span v-if="message.isReplay" class="bg-yellow-2 text-bold">{{
              message.replayedMessage
            }}</span>
            <q-separator v-if="message.isReplay" color="red" />
            {{ message.message }}
          </p>
          <q-btn
            size="10px"
            round
            color="teal"
            icon="reply"
            @click="replayMessage(message)"
          ></q-btn>
          <p class="chat_your_message_time">
            {{ functionsService.getTime(message.createdDate) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue';
import { useStore } from '../../store';
import { AppConstants, functionsService } from '../../core/Export';
import { Msg } from '../../store/chats/models';

export default defineComponent({
  props: {
    message: {
      type: Object as PropType<Msg>,
      required: true,
    },
    prev: {
      type: Object as PropType<Msg>,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();
    const isSamePersonSentPrevAndCurrent = ref(false);
    const isCurrentUser = ref(false);
    const date = ref(null);

    const user = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );

    if (props.message.username === user.value.username) {
      isCurrentUser.value = true;
    }
    if (props.prev != null && props.prev?.username == props.message?.username) {
      isSamePersonSentPrevAndCurrent.value = true;
    }
    if (
      props.prev === null ||
      functionsService.getDate(props.prev?.createdDate) !=
        functionsService.getDate(props.message?.createdDate)
    ) {
      date.value = functionsService.getDate(props.message?.createdDate);
    }

    const replayMessage = (msg: Msg): void => {
      store.commit(
        `${AppConstants.ChatModule}/${AppConstants.Chats.MutationSetMessageToReplay}`,
        msg
      );
      store.commit(
        `${AppConstants.UiModule}/${AppConstants.Ui.MutationShowDialog}`
      );
    };
    return {
      isSamePersonSentPrevAndCurrent,
      date,
      isCurrentUser,
      functionsService,
      replayMessage,
    };
  },
});
</script>

<style>
.chat_message {
  display: flex;
  justify-content: right;
  align-items: flex-end;
  margin: 0;
  min-height: 40px;
  line-break: anywhere;
}

.chat_message_paragraph {
  margin: 0.4rem 0 0 1rem;
  border-radius: 20px 20px 0px 20px;
  max-width: 180px;
  background-color: lightblue;
  color: black;
  padding: 0.8rem;
  font-size: 14px;
}

.chat_first {
  margin-top: 2rem;
}

.chat_your_message {
  display: flex;
}

.chat_your_message_avatar {
  width: 40px;
  margin-right: 1rem;
}

.chat_your_message_user {
  font-size: 14px;
  font-weight: 700;
  color: #292929;
  margin-top: 0;
  margin-block-end: 0rem;
}

.chat_your_message_p {
  display: flex;
  align-items: flex-end;
  line-break: anywhere;
}

.chat_your_message_paragraph {
  margin: 0.4rem 1rem 0 0;
  border-radius: 0px 20px 20px 20px;
  background-color: #f3f3f3;
  max-width: 180px;
  color: #414141;
  padding: 0.8rem;
  font-size: 14px;
}

.chat_your_message_time {
  margin: 0;
  font-size: 12px;
  color: #9c9c9c;
}
</style>
