<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
const authStore = useAuthStore()

const { menu } = toRefs(menuStore)
</script>

<template>
  <div
    v-if="menu && menu.length > 0"
    class="menu__items flex_row"
  >
    <div
      v-for="(item, index) in menu"
      :key="index"
      class="menu__items-item"
    >
      <router-link
        v-if="item.link"
        :to="item.link"
      >
        {{ item.name }}
      </router-link>
      <span
        v-else
        @click="authStore.logout"
      >{{ item.name }}</span>
    </div>
  </div>
</template>
