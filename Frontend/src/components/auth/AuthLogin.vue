<template>
  <div style="width: 350px; margin: 0 auto">
    <q-card square class="shadow-24">
      <q-card-section class="bg-primary">
        <h4 class="text-h5 text-white q-my-md">Chat Room</h4>
      </q-card-section>
      <q-card-section>
        <q-card-section>
          <q-form @submit="onConnect" class="q-px-sm q-pt-xl">
            <q-input
              square
              clearable
              v-model="user.username"
              lazy-rules
              :rules="nameRules"
              label="Username"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>

            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                type="submit"
                size="lg"
                color="primary"
                class="full-width text-white"
                label="Connect"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  AppConstants,
  nameRules,
  showInfo,
  socketManagerInstance,
} from '../../core/Export';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';
import { AuthUser } from '../../store/auth/models';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = ref(new AuthUser());

    const onConnect = (): void => {
      user.value.avatar = user.value.username.slice(0, 1);
      store
        .dispatch(
          `${AppConstants.AuthModule}/${AppConstants.Auth.ActionAuthLoggedIn}`,
          user.value
        )
        .then(() => {
          socketManagerInstance.connect();
          showInfo(`Welcome ${user.value.username}`);
          router.push({ name: AppConstants.Routes.ChatRoomPage });
        });
    };
    return {
      user,
      nameRules,
      onConnect,
    };
  },
});
</script>
