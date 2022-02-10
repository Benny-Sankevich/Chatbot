<template>
  <q-layout view="hHh lpR fFf">
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    Header: defineAsyncComponent(() => import('./Header.vue')),
  },
});
</script>
