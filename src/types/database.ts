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
      organizations: {
        Row: {
          id: string
          name: string
          plan: string
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          plan?: string
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          plan?: string
          stripe_customer_id?: string | null
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      org_members: {
        Row: {
          id: string
          org_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at: string
        }
        Insert: {
          id?: string
          org_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
        Update: {
          role?: 'owner' | 'admin' | 'member'
        }
      }
      templates: {
        Row: {
          id: string
          org_id: string
          name: string
          description: string | null
          fields: Json
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          org_id: string
          name: string
          description?: string | null
          fields?: Json
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          fields?: Json
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          org_id: string
          user_id: string
          template_id: string | null
          status: 'active' | 'completed' | 'archived'
          title: string | null
          form_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          org_id: string
          user_id: string
          template_id?: string | null
          status?: 'active' | 'completed' | 'archived'
          title?: string | null
          form_data?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          template_id?: string | null
          status?: 'active' | 'completed' | 'archived'
          title?: string | null
          form_data?: Json
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          metadata?: Json | null
          created_at?: string
        }
        Update: never
      }
      documents: {
        Row: {
          id: string
          org_id: string
          session_id: string | null
          uploaded_by: string | null
          name: string
          storage_path: string
          mime_type: string | null
          size_bytes: number | null
          created_at: string
        }
        Insert: {
          id?: string
          org_id: string
          session_id?: string | null
          uploaded_by?: string | null
          name: string
          storage_path: string
          mime_type?: string | null
          size_bytes?: number | null
          created_at?: string
        }
        Update: never
      }
      usage_events: {
        Row: {
          id: string
          org_id: string
          user_id: string
          event_type: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          org_id: string
          user_id: string
          event_type: string
          metadata?: Json | null
          created_at?: string
        }
        Update: never
      }
    }
    Functions: {
      my_org_ids: {
        Args: Record<string, never>
        Returns: string[]
      }
    }
  }
}
