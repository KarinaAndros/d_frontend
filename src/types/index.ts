/**
 * Interface for User
 */
export interface UserType {
  avatar?: string
  avatar_url?: string
  date?: string
  new_date?: string
  created_at: string
  email: string
  email_verified_at?: string
  applications?: ApplicationType[]
  id: number
  lat: number
  lng: number
  name: string
  surname: string
  updated_at: string
}

export interface InputType {
  name: 'email' | 'password'
  type: string
  placeholder: string
}

export interface InputTypeReg {
  name: 'email' | 'password' | 'name' | 'surname' | 'password_confirmation'
  type: string
  placeholder: string
}

export interface InputTypeEdit {
  name: 'name' | 'surname' | 'date' | 'avatar'
  type: string
  placeholder: string
}

export interface InputTypeInterests {
  name: 'title'
  type: string
  placeholder: string
}

export interface InputTypeApplications {
  name: 'title' | 'date' | 'time'
  type: string
  placeholder: string
}


export interface InterestCategories {
  id: number
  title: string
}

export interface InterestType {
  user_id: number
  title: string
  description?: string | null
  interest_category_id: number
}

export interface CategoryTypeProfile{
  created_at: string
  updated_at: string
  id: number
  title: string
}

export interface InterestTypeProfile {
  id: number
  user_id: number
  title: string
  description?: string | null
  interest_category_id: number
  created_at: string
  updated_at: string
  category: CategoryTypeProfile
}

export interface ApplicationStatuses {
  id: number
  title: string
  created_at?: string
  updated_at?: string
}

export interface ApplicationTypeForm {
  title: string
  description?: string | null
  date: string
  time: string
  application_status_id: number
  user_id: number
}


export interface ApplicationType {
  id: number,
  title: string
  created_at: string
  updated_at: string
  description?: string | null
  date: string
  new_date: string
  time: string
  new_time: string
  application_status_id: number
  user_id: number
  status: ApplicationStatuses
}
