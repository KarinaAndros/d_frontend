<script setup lang="ts">
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()
</script>

<template>
  <ul
    v-if="modalStore.interestsModal && modalStore.interestsModal.length > 0"
    class="interests"
  >
    <li
      v-for="item in modalStore.interestsModal"
      :key="item.id"
      class="profile_interest"
    >
      <div class="profile_application-title">
        {{ item.title }}
      </div>
    </li>
  </ul>
</template>
