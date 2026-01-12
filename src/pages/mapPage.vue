<script setup lang="ts">
import type { MapUser } from '@/stores/map'
import type { ApplicationType, UserType } from '@/types'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, shallowRef } from 'vue'

import { Carousel, Navigation, Slide } from 'vue3-carousel'

import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker } from 'vue-yandex-maps'
import api from '@/api'
import ApplicationsUser from '@/components/Modals/users/applicationsUser.vue'
import { useAuthStore } from '@/stores/auth'
import { useMapStore } from '@/stores/map'
import { useModalStore } from '@/stores/modal'
import echo from '../../resources/js/echo'
import 'vue3-carousel/carousel.css'

const map = shallowRef(null)
const mapSettings = { location: { center: [44.006516, 56.326797], zoom: 12 } }

const authStore = useAuthStore()
const mapStore = useMapStore()
const { authUserData: me } = storeToRefs(authStore)
const otherUsers = ref<MapUser[]>([])

authStore.getAuthUser()

const authUser = ref<UserType | null>()

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

const carouselConfig = {
  height: 150,
  itemsToShow: 3,
  wrapAround: true,
}

watch(() => authStore.authUserData, (newVal) => {
  authUser.value = newVal
}, { deep: true, immediate: true })

const usersWithCommonInterests = ref<MapUser[]>([])

watch(() => mapStore.users, (newVal) => {
  otherUsers.value = newVal
  if (!authUser.value?.interests?.length || !newVal.length) {
    usersWithCommonInterests.value = []
    return
  }
  const authUserInterestTitles = new Set(
    authUser.value.interests.map(interest => interest.title),
  )
  usersWithCommonInterests.value = newVal.filter((user) => {
    if (!user.interests?.length)
      return false
    return user.interests.some(interest =>
      authUserInterestTitles.has(interest.title),
    )
  })
}, { deep: true, immediate: true })

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
  <div class="map">
    <yandex-map
      v-model="map"
      class="map-container"
      :settings="mapSettings"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
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
  </div>

  <div
    v-if="usersWithCommonInterests && usersWithCommonInterests.length > 0"
    class="friends_block container"
  >
    <div>Люди с схожими интересами</div>

    <carousel v-bind="carouselConfig">
      <slide
        v-for="user in usersWithCommonInterests"
        :key="user.id"
        class="friends_slide"
      >
        <img
          v-if="user?.avatar_url"
          loading="lazy"
          :src="user?.avatar_url"
        >
        <div class="profile_name">
          {{ user.name }} {{ user?.surname }}
        </div>
      </slide>

      <template #addons>
        <navigation />
      </template>
    </carousel>

    <!-- <div class="friends">
      <div
        v-for="user in usersWithCommonInterests"
        :key="user.id"
        class="friend"
      >
        <img
          v-if="user?.avatar_url"
          loading="lazy"
          :src="user?.avatar_url"
        >
        <div class="profile_name">
          {{ user.name }} {{ user?.surname }}
        </div>
      </div>
    </div> -->
  </div>
</template>
