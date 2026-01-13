import HomeComponent from '@/components/homeComponent.vue'
import LoginPage from '@/pages/loginPage.vue'
import MapPage from '@/pages/mapPage.vue'
import ProfilePage from '@/pages/profilePage.vue'
import RegistrationPage from '@/pages/registrationPage.vue'

export const routes = [
  { path: '/', name: 'main', component: HomeComponent},
  { path: '/registration', component: RegistrationPage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/profile', name: 'profile', component: ProfilePage, meta: { requiresAuth: true } },
  { path: '/map', name: 'map', component: MapPage, meta: { requiresAuth: true } },
]
