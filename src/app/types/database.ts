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
      cards: {
        Row: {
          content: string | null
          created_at: string
          id: string
          index: number
          list: string
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          index: number
          list: string
          title?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          index?: number
          list?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_list_fkey"
            columns: ["list"]
            referencedRelation: "lists"
            referencedColumns: ["id"]
          }
        ]
      }
      lists: {
        Row: {
          board: string
          created_at: string
          id: string
          index: number
          title: string
        }
        Insert: {
          board: string
          created_at?: string
          id?: string
          index: number
          title?: string
        }
        Update: {
          board?: string
          created_at?: string
          id?: string
          index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lists_board_fkey"
            columns: ["board"]
            referencedRelation: "boards"
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
