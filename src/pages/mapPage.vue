<script setup lang="ts">
import type { ApplicationType } from '@/types'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'

import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker } from 'vue-yandex-maps'

import api from '@/api'
import ApplicationsUser from '@/components/Modals/users/applicationsUser.vue'
import { useAuthStore } from '@/stores/auth'
import { useMapStore } from '@/stores/map'
import { useModalStore } from '@/stores/modal'
import echo from '../../resources/js/echo'

const map = shallowRef(null)
const mapSettings = { location: { center: [44.006516, 56.326797], zoom: 12 } }

const authStore = useAuthStore()
const mapStore = useMapStore()
const { authUserData: me } = storeToRefs(authStore)
const { users: otherUsers } = storeToRefs(mapStore)

async function sendMyLocation(lat: number, lng: number) {
  try {
    if (me.value) {
      me.value.lat = lat
      me.value.lng = lng
    }
    await api.post('/api/user/location', { lat, lng })
  }
  catch (e) {
    console.error(e)
  }
}

function startTracking() {
  if (!navigator.geolocation)
    return
  navigator.geolocation.watchPosition(
    (pos) => {
      sendMyLocation(pos.coords.latitude, pos.coords.longitude)
    },
    err => console.error(err),
    { enableHighAccuracy: true },
  )
}

function openModal(val: ApplicationType[]) {
  useModalStore().openModal(ApplicationsUser, null, null, val)
}

onMounted(() => {
  mapStore.fetchUsers()
  startTracking()
  echo.channel('map')
    .listen('.UserAdded', (e: any) => {
      if (me.value && e.id === me.value.id)
        return
      mapStore.handleUserMove(e)
    })
})

onUnmounted(() => {
  echo.leave('map')
})
</script>

<template>
  <yandex-map
    v-model="map"
    class="map-container"
    :settings="mapSettings"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />
    <yandex-map-marker
      v-if="me && me.lat"
      class="custom-marker"
      :settings="{
        coordinates: [Number(me.lng), Number(me.lat)],
        zIndex: 20,
      }"
    >
      <div class="custom-marker">
        <img
          :src="me.avatar_url"
          class="avatar"
        >
        <span class="name">я</span>
      </div>
    </yandex-map-marker>
    <yandex-map-marker
      v-for="user in otherUsers"
      :key="user.id"
      :settings="{
        coordinates: [Number(user.lng), Number(user.lat)],
        zIndex: 10,
      }"
    >
      <div class="custom-marker">
        <img
          :src="user.avatar_url"
          class="avatar"
        >
        <div
          v-if="user.active_applications && user.active_applications.length > 0"
          class="user_apps"
          @click="openModal(user.active_applications)"
        >
          !
        </div>
        <span class="name">{{ user.name }}</span>
      </div>
    </yandex-map-marker>
  </yandex-map>
</template>
