<script setup lang="ts">
import { useModalStore } from '@/stores/modal'

const modalStore = useModalStore()

const { modal } = storeToRefs(modalStore)

const modalContent = computed<Component | null>(() => {
  return modal.value.modal_content
})
</script>

<template>
  <div
    class="modal_inner"
    @click="modalStore.closeModal"
  >
    <div
      class="modal"
      @click.stop
    >
      <img
        class="close_icon"
        src="/icons/close.svg"
        @click="modalStore.closeModal"
      >
      <component
        :is="modalContent"
        v-if="modalContent"
      />
    </div>
  </div>
</template>
