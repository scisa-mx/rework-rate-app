import type { Tag } from './tags'

export type Repository = {
  name: string
  repoUrl: string
  id: string
  description: string
  tags: Tag[]
}
