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
  id: number
  lat: number
  lng: number
  name: string
  surname: string
  updated_at: string
}

export interface InputType {
  name: 'email' | 'password' | 'name' | 'surname' | 'password_confirmation' | 'date' | 'avatar'
  type: string
  placeholder: string
}

export interface InputTypeEdit {
  name: 'name' | 'surname' | 'date' | 'avatar'
  type: string
  placeholder: string
}
