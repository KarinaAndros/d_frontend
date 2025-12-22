<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

const { menu } = menuStore
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
      <router-link :to="item.link">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>
