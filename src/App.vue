<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

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
            router.push('/about')
          }
        "
      >
        GO TO APP
      </button>
      <button
        v-show="isApp"
        @click="
          () => {
            router.push('/')
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
