<script setup lang="ts">
import type { InterestCategories, InterestTypeProfile } from '@/types'
import Interests from '@/components/Modals/users/interests.vue'
import { useInterestStore } from '@/stores/interests'
import { useModalStore } from '@/stores/modal'
import InterestsUser from '../Modals/users/interestsUser.vue'

interface TabType {
  id: number,
  title: string
}

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
const activeTab = ref<TabType>({
  id: 1,
  title: 'спорт'
})

const filteredInterests = computed(() => {
  if (!activeTab.value) {
    return props.interests
  }
  return props.interests.filter(
    interest => interest.category.id === activeTab.value.id,
  )
})

// functions
function editInterests() {
  modalStore.openModal(Interests)
}
function removeInterest(int: number) {
  interestsStore.deleteInterest(int)
}
function moreInterests() {
  modalStore.setInterests(filteredInterests.value)
  modalStore.openModal(InterestsUser, activeTab.value.title)
}
</script>

<template>
  <div class="tabs flex_row">
    <div
      v-for="cat in categories"
      :key="cat.id"
      class="tab"
      :class="{ 'tab-active': cat.id === activeTab.id }"
      @click="activeTab = {
        id:cat.id,
        title:cat.title
      }"
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
        v-for="int in filteredInterests.slice(0, 2)"

        :key="int.id"
      >
        <template v-if="int.category.id === activeTab.id">
          {{ int.title }}

          <span
            v-if="editInt"
            class="icon"
            @click="removeInterest(int.id)"
          >
            <img
              class="remove_icon"
              src="/icons/remove.svg"
            >
          </span>
        </template>
      </li>
    </ul>
  </div>
  <div v-else>
    Пока что пусто :(
  </div>
  <div class="interests_buttons">
    <span
      v-if="filteredInterests.length > 2"
      class="icon"
      @click="moreInterests"
    >
      <img
        class="right_icon"
        src="/icons/right.svg"
      >
    </span>
    <div class="interests_buttons">
      <span
        class="icon"
        @click="editInterests"
      >
        <img
          class="add_icon"
          src="/icons/add.svg"
        >
      </span>
      <span
        v-if="filteredInterests.length > 0"
        class="icon"
        :class="{ active: editInt }"
        @click="editInt = !editInt"
      >
        <img
          class="edit_icon"
          src="/icons/edit.svg"
        >
      </span>
    </div>
  </div>
</template>
