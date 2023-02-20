
export const BASE_URL = "https://www.tabnews.com.br/api/v1"

export enum Strategy {
    NEW = "new",
    OLD = "old",
    relevant = "relevant"
}

export interface Post {
  id: string
  owner_id: string
  parent_id: any
  slug: string
  title: string
  status: string
  source_url?: string
  created_at: string
  updated_at: string
  published_at: string
  deleted_at: any
  owner_username: string
  tabcoins: number
  children_deep_count: number
}

export function getPostPageUrl(page: number, limit: number, strategy: Strategy){
    return `${BASE_URL}/contents?page=${page}&per_page=${limit}&strategy=${strategy}`
}
