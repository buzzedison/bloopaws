export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      referrals: {
        Row: {
          id: string
          created_at: string
          referrer_id: string
          referrer_name: string
          referrer_email: string
          referrer_phone: string
          client_name: string
          client_email: string
          client_phone: string
          company_name: string
          message: string
          status: 'pending' | 'closed' | 'rejected'
          potential_value: number
          actual_value: number | null
          commission: number | null
          commission_rate: number
          referrer_code: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          referrer_id?: string
          referrer_name: string
          referrer_email: string
          referrer_phone: string
          client_name: string
          client_email: string
          client_phone: string
          company_name: string
          message: string
          status?: 'pending' | 'closed' | 'rejected'
          potential_value?: number
          actual_value?: number | null
          commission?: number | null
          commission_rate?: number
          referrer_code?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          referrer_id?: string
          referrer_name?: string
          referrer_email?: string
          referrer_phone?: string
          client_name?: string
          client_email?: string
          client_phone?: string
          company_name?: string
          message?: string
          status?: 'pending' | 'closed' | 'rejected'
          potential_value?: number
          actual_value?: number | null
          commission?: number | null
          commission_rate?: number
          referrer_code?: string | null
        }
      }
      referral_codes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          code: string
          uses: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          code: string
          uses?: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          code?: string
          uses?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
