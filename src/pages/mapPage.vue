<script setup lang="ts">
import type { LngLat, YMap } from '@yandex/ymaps3-types'
import { ref } from 'vue'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
} from 'vue-yandex-maps'
import { useAuthStore } from '@/stores/auth'

const { users } = useAuthStore()

interface mapSettingsType {
  location: {
    center: LngLat
    zoom: number
  }
}

const mapSettings = ref<mapSettingsType>({
  location: {
    center: [44.006516, 56.326797],
    zoom: 13,
  },
})

const map = shallowRef<null | YMap>(null)
</script>

<template>
  <yandex-map
    v-model="map"
    :settings="mapSettings"
    width="100%"
    height="92dvh"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />
    <yandex-map-default-marker
      v-for="user in users"
      :key="user.id"
      :settings="{ coordinates: [user.lng, user.lat] }"
    />
  </yandex-map>
</template>
