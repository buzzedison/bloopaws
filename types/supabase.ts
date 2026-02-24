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
      applications: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          role: 'mobile' | 'bd-sales' | 'investment'
          full_name: string
          email: string
          phone: string
          location: string
          experience: string
          portfolio: string
          linkedin: string | null
          github: string | null
          motivation: string
          availability: string
          referral_source: string | null
          status: 'pending' | 'approved' | 'rejected' | 'quiz_sent' | 'quiz_completed' | 'interview_scheduled' | 'hired' | 'withdrawn'
          status_updated_at: string
          status_notes: string | null
          quiz_invited_at: string | null
          quiz_completed_at: string | null
          quiz_score: number | null
          quiz_passed: boolean | null
          quiz_feedback: string | null
          interview_scheduled_at: string | null
          interview_completed_at: string | null
          interview_notes: string | null
          interview_rating: number | null
          final_decision: 'hired' | 'rejected' | 'waitlist' | 'pending' | null
          final_decision_at: string | null
          final_decision_notes: string | null
          admin_notes: string | null
          tags: string[] | null
          application_id: string
          source_ip: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          role: 'mobile' | 'bd-sales' | 'investment'
          full_name: string
          email: string
          phone: string
          location: string
          experience: string
          portfolio: string
          linkedin?: string | null
          github?: string | null
          motivation: string
          availability: string
          referral_source?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'quiz_sent' | 'quiz_completed' | 'interview_scheduled' | 'hired' | 'withdrawn'
          status_updated_at?: string
          status_notes?: string | null
          quiz_invited_at?: string | null
          quiz_completed_at?: string | null
          quiz_score?: number | null
          quiz_passed?: boolean | null
          quiz_feedback?: string | null
          interview_scheduled_at?: string | null
          interview_completed_at?: string | null
          interview_notes?: string | null
          interview_rating?: number | null
          final_decision?: 'hired' | 'rejected' | 'waitlist' | 'pending' | null
          final_decision_at?: string | null
          final_decision_notes?: string | null
          admin_notes?: string | null
          tags?: string[] | null
          application_id?: string
          source_ip?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          role?: 'mobile' | 'bd-sales' | 'investment'
          full_name?: string
          email?: string
          phone?: string
          location?: string
          experience?: string
          portfolio?: string
          linkedin?: string | null
          github?: string | null
          motivation?: string
          availability?: string
          referral_source?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'quiz_sent' | 'quiz_completed' | 'interview_scheduled' | 'hired' | 'withdrawn'
          status_updated_at?: string
          status_notes?: string | null
          quiz_invited_at?: string | null
          quiz_completed_at?: string | null
          quiz_score?: number | null
          quiz_passed?: boolean | null
          quiz_feedback?: string | null
          interview_scheduled_at?: string | null
          interview_completed_at?: string | null
          interview_notes?: string | null
          interview_rating?: number | null
          final_decision?: 'hired' | 'rejected' | 'waitlist' | 'pending' | null
          final_decision_at?: string | null
          final_decision_notes?: string | null
          admin_notes?: string | null
          tags?: string[] | null
          application_id?: string
          source_ip?: string | null
          user_agent?: string | null
        }
      }
      quiz_submissions: {
        Row: {
          id: string
          created_at: string
          application_id: string | null
          application_email: string
          role: 'mobile' | 'bd-sales' | 'investment'
          quiz_token: string
          time_limit: number
          total_points: number
          answers: Json
          submitted_at: string | null
          time_taken: number | null
          mcq_score: number
          mcq_total: number
          total_score: number
          percentage: number | null
          passed: boolean | null
          graded: boolean
          graded_at: string | null
          graded_by: string | null
          feedback: string | null
          section_breakdown: Json | null
          ip_address: string | null
          user_agent: string | null
          time_up: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          application_id?: string | null
          application_email: string
          role: 'mobile' | 'bd-sales' | 'investment'
          quiz_token: string
          time_limit: number
          total_points: number
          answers: Json
          submitted_at?: string | null
          time_taken?: number | null
          mcq_score?: number
          mcq_total?: number
          total_score?: number
          percentage?: number | null
          passed?: boolean | null
          graded?: boolean
          graded_at?: string | null
          graded_by?: string | null
          feedback?: string | null
          section_breakdown?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          time_up?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          application_id?: string | null
          application_email?: string
          role?: 'mobile' | 'bd-sales' | 'investment'
          quiz_token?: string
          time_limit?: number
          total_points?: number
          answers?: Json
          submitted_at?: string | null
          time_taken?: number | null
          mcq_score?: number
          mcq_total?: number
          total_score?: number
          percentage?: number | null
          passed?: boolean | null
          graded?: boolean
          graded_at?: string | null
          graded_by?: string | null
          feedback?: string | null
          section_breakdown?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          time_up?: boolean
        }
      }
      application_status_history: {
        Row: {
          id: string
          created_at: string
          application_id: string
          old_status: string | null
          new_status: string
          changed_by: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          application_id: string
          old_status?: string | null
          new_status: string
          changed_by?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          application_id?: string
          old_status?: string | null
          new_status?: string
          changed_by?: string | null
          notes?: string | null
        }
      }
      referral_partner_applications: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string | null
          full_name: string
          email: string
          phone_number: string
          city_country: string
          industry: string
          network: string
          motivation: string | null
          status: 'pending' | 'approved' | 'rejected'
          approved_at: string | null
          approved_by: string | null
          admin_notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          full_name: string
          email: string
          phone_number: string
          city_country: string
          industry: string
          network: string
          motivation?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          approved_at?: string | null
          approved_by?: string | null
          admin_notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          full_name?: string
          email?: string
          phone_number?: string
          city_country?: string
          industry?: string
          network?: string
          motivation?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          approved_at?: string | null
          approved_by?: string | null
          admin_notes?: string | null
        }
      }
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
