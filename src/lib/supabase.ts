import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export type UserRole = 'admin' | 'teacher' | 'student'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  full_name: string
  approved: boolean
  created_at: string
}

export interface TeacherProfile extends UserProfile {
  mobile_number: string
  address: string
  aadhar_number: string
  date_of_birth: string
  grade: string
  subjects: string[]
}

export interface StudentProfile extends UserProfile {
  father_name: string
  mother_name: string
  date_of_birth: string
  aadhar_number: string
  class: string
  roll_number: string
  section: string
}