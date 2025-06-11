<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { RouteNames } from './router/route-names'

const router = useRouter()
const route = useRoute()
const isApp = computed(() => route.path === '/about')
</script>

<template>
  <div class="app-wrapper">
    <header>
      <button
        v-show="!isApp"
        @click="
          () => {
            router.push(RouteNames.About)
          }
        "
      >
        GO TO APP
      </button>
      <button
        v-show="isApp"
        @click="
          () => {
            router.push(RouteNames.Home)
          }
        "
      >
        GO TO HOME
      </button>
    </header>
  </div>
  <RouterView />
</template>

<style scoped>
main.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
