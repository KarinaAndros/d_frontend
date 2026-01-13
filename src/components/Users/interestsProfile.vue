<script setup lang="ts">
import type { InterestCategories, InterestTypeProfile } from '@/types'
import Interests from '@/components/Modals/users/interests.vue'
import { useInterestStore } from '@/stores/interests'
import { useModalStore } from '@/stores/modal'

// props
const props = defineProps<{
  interests: InterestTypeProfile[]
  categories?: InterestCategories[]
}>()

// stores
const modalStore = useModalStore()
const interestsStore = useInterestStore()

// values
const editInt = ref<boolean>(false)
const activeTab = ref<number>(1)

const filteredInterests = computed(() => {
  if (!activeTab.value) {
    return props.interests
  }
  return props.interests.filter(
    interest => interest.category.id === activeTab.value
  )
})

// functions
function editInterests() {
  modalStore.openModal(Interests)
}
function removeInterest(int: number) {
  interestsStore.deleteInterest(int)
}
</script>

<template>
  <div class="tabs flex_row">
    <div
      v-for="cat in categories"
      :key="cat.id"
      class="tab"
      :class="{ 'tab-active': cat.id === activeTab }"
      @click="activeTab = cat.id"
    >
      {{ cat.title }}
    </div>
  </div>
  <div
    v-if="filteredInterests && filteredInterests.length > 0"
    class="profile_interests"
  >
    <ul>
      <li
        v-for="int in filteredInterests"

        :key="int.id"
      >
        <template v-if="int.category.id === activeTab">
          {{ int.title }}
          <span
            v-if="editInt"
            @click="removeInterest(int.id)"
          >X</span>
        </template>
      </li>
    </ul>
  </div>
  <div v-else>
    Пока что пусто :(
  </div>
  <div class="profile_buttons">
    <button
      class="button"
      @click="editInterests"
    >
      Добавить
    </button>
    <button
      class="button"
      @click="editInt = !editInt"
    >
      Изменить
    </button>
  </div>
</template>
