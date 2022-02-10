<template>
  <q-page class="q-px-md row justify-center items-center">
    <AuthLogin />
  </q-page>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    AuthLogin: defineAsyncComponent(
      () => import('../components/auth/AuthLogin.vue')
    ),
  },
});
</script>
