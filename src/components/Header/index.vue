<script setup lang="ts">
const menuActive = ref<boolean>(true)

// function menuFunction() {
//   menuActive.value = !menuActive.value
// }
</script>

<template>
  <header>
    <div
      class="container header flex_row"
      :class="{ active: menuActive }"
    >
      <!-- <div
        class="burger flex_column"
        :class="{ active: menuActive }"
        @click="menuFunction"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="burger__line"
        />
      </div> -->
      <HeaderMenu v-if="menuActive" />
    </div>
  </header>
</template>
