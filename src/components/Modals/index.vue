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
      <div class="modal_header">
        <img
          class="close_icon"
          src="/icons/close.svg"
          @click="modalStore.closeModal"
        >
      </div>
      <div class="modal_body">
      <component
        :is="modalContent"
        v-if="modalContent"
      />
      </div>
    </div>
  </div>
</template>
