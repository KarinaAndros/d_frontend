<script setup lang="ts">
import type { LngLat, YMap } from '@yandex/ymaps3-types'
import { storeToRefs } from 'pinia'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
} from 'vue-yandex-maps'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { users } = storeToRefs(authStore)
const { getLocation } = authStore

const lat = ref<number>(0)
const lng = ref<number>(0)
const map = shallowRef<null | YMap>(null)

interface MapSettingsType {
  location: {
    center: LngLat
    zoom: number
  }
}

const mapSettings = ref<MapSettingsType>({
  location: {
    center: [44.006516,56.326797],
    zoom: 12,
  },
})

onMounted(() => {
  try {
    getLocation()
  }
  catch (error) {
    console.error('Ошибка при инициализации карты:', error)
    lat.value = 56.326797
    lng.value = 44.006516
  }
})
</script>

<template>
  <!-- {{ users }} -->
  <div class="map-container">
    <yandex-map
      v-model="map"
      :settings="mapSettings"
      width="100%"
      height="92dvh"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <div v-if="users.length">
        <yandex-map-default-marker
          v-for="user in users"
          :key="user.id"
          :settings="{
            coordinates: [user.lng | lng, user.lat | lat],
          }"
        />
      </div>
    </yandex-map>
  </div>
</template>
