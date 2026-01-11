import type { ApplicationStatuses, ApplicationType, ApplicationTypeForm, InterestTypeProfile } from '../types/index'
import api from '@/api'
import { useModalStore } from './modal'

export const useApplicationStore = defineStore('applications', () => {
  const applicationsUser = ref<[]>()

  const applications = ref<ApplicationType[]>()

  const statuses = ref<ApplicationStatuses[]>()

  const getApplicationsStatuses = async () => {
    await api.get('/api/applications-statuses').then((response) => {
      if (response.status === 200) {
        statuses.value = response.data
      }
    })
  }


  const getApplications = async () => {
    await api.get('/api/user/applications', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        applicationsUser.value = response.data
      }
    })
  }

  const storeApplication = async (values: ApplicationTypeForm) => {
    await api.post('/api/applications', values).then((response) => {
      if (response.status === 200) {
        getApplications()
        useModalStore().closeModal()
      }
    })
  }

  const updateApplication = async (values: ApplicationTypeForm, id?: number) => {
    await api.put(`/api/applications/${id}`, values).then((response) => {
      if (response.status === 200) {
        getApplications()
        useModalStore().closeModal()
      }
    })
  }

  const deleteApplication = async (id: number) => {
    await api.delete(`/api/applications/${id}`).then((response) => {
      if (response.status === 200) {
        getApplications()
      }
    })
  }

  return {
    applications,
    applicationsUser,
    statuses,
    getApplications,
    storeApplication,
    deleteApplication,
    updateApplication,
    getApplicationsStatuses
  }
})
