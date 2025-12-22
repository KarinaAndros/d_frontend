<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

defineProps<{
  attrs?: Record<string, any>
  name: string
  type?: InputTypeHTMLAttribute
  placeholder?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <input
    v-model="model"
    v-bind="attrs"
    :type="type || 'text'"
    :placeholder="placeholder"
  >
</template>
