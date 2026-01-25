<script setup lang="ts">
import type { MapUser } from '@/stores/map'
import type { ApplicationType, UserType } from '@/types'
import { Geolocation } from '@capacitor/geolocation'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer, YandexMapMarker } from 'vue-yandex-maps'
import api from '@/api'
import ApplicationsUser from '@/components/Modals/users/applicationsUser.vue'
import { useApplicationStore } from '@/stores/applications'
import { useAuthStore } from '@/stores/auth'
import { useMapStore } from '@/stores/map'
import { useModalStore } from '@/stores/modal'
import echo from '../../resources/js/echo'
import 'vue3-carousel/carousel.css'

const map = shallowRef(null)
const mapSettings = ref<any>({ location: { center: [44.006516, 56.326797], zoom: 17 } })

const authStore = useAuthStore()
const applicationsStore = useApplicationStore()
const { activeApplications: allApplications } = storeToRefs(applicationsStore)
const mapStore = useMapStore()
const { authUserData: me } = storeToRefs(authStore)
const otherUsers = ref<MapUser[]>([])
const fullBlock = ref<boolean>(false)

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

async function startTracking() {
  try {
    // Проверка прав
    const permStatus = await Geolocation.checkPermissions()
    if (permStatus.location !== 'granted') {
      const req = await Geolocation.requestPermissions()
      if (req.location !== 'granted')
        return
    }

    // Получаем текущую (быстро)
    const current = await Geolocation.getCurrentPosition()
    sendMyLocation(current.coords.latitude, current.coords.longitude)

    // Центрируем карту на себя при старте
    mapSettings.value = {
      location: { center: [current.coords.longitude, current.coords.latitude], zoom: 17 },
    }

    // Запускаем слежение (Watch)
    await Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 10000 },
      (pos) => {
        if (pos) {
          sendMyLocation(pos.coords.latitude, pos.coords.longitude)
        }
      },
    )
  }
  catch (e) {
    console.error('Геолокация недоступна:', e)
  }
}

function openModal(val: ApplicationType[]) {
  useModalStore().openModal(ApplicationsUser, 'Помощь другим', null, null, val)
}

const carouselConfig = {
  height: 150,
  itemsToShow: 3,
  wrapAround: false,
}

watch(me, (newMe) => {
  mapSettings.value = { location: { center: [newMe?.lng, newMe?.lat], zoom: 17 } }
})

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
  applicationsStore.getActiveApplications()
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
    <div v-if="allApplications && allApplications.length > 0" 
      class="active_apps_btn"
      @click="openModal(allApplications)">
      <img class="edit_icon"
       src="/icons/help.svg">
    </div>
    <yandex-map v-model="map" 
    class="map-container"
     :settings="mapSettings">
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-marker v-if="me" 
      :settings="{
        coordinates: [Number(me.lng), Number(me.lat)],
        zIndex: 10,
      }">
        <div class="custom-marker">
          <img :src="me.avatar_url" 
          class="avatar">
          <span class="name">{{ me.name }}</span>
        </div>
      </yandex-map-marker>
      <yandex-map-marker v-for="user in otherUsers" 
      :key="user.id" 
      :settings="{
        coordinates: [Number(user.lng), Number(user.lat)],
        zIndex: 10,
      }">
        <div class="custom-marker">
          <img :src="user.avatar_url" 
          class="avatar">
          <span class="name">{{ user.name }}</span>
        </div>
      </yandex-map-marker>
    </yandex-map>
  </div>

  <div class="friends_block container" 
  :class="{ full: fullBlock }">
    <div class="flex_row friends_block-top">
      <div>Люди с схожими интересами</div>
      <img class="open_icon" 
      src="/icons/right.svg"
       @click="fullBlock = !fullBlock">
    </div>

    <carousel v-if="usersWithCommonInterests.length > 3"
       v-bind="carouselConfig">
      <slide v-for="user in usersWithCommonInterests"
       :key="user.id"
        class="friends_slide">
        <img v-if="user?.avatar_url" 
        loading="lazy" 
        :src="user?.avatar_url">
        <div class="profile_name">
          {{ user.name }} {{ user?.surname }}
        </div>
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>

    <div v-else
     class="friends">
      <div v-for="user in usersWithCommonInterests"
       :key="user.id" 
       class="friend">
        <img v-if="user?.avatar_url"
         loading="lazy" 
         :src="user?.avatar_url">
        <div class="profile_name">
          {{ user.name }} {{ user?.surname }}
        </div>
      </div>
    </div>
  </div>
</template>
