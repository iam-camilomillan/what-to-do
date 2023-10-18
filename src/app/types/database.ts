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
      boards: {
        Row: {
          created_at: string
          description: string
          id: string
          opened_at: string
          title: string
          user: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          opened_at?: string
          title?: string
          user?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          opened_at?: string
          title?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "boards_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
