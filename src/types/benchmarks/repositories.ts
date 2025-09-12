import type { Tag } from './tags'

export type Repository = {
  id: string
  name: string
  repoUrl: string
  description: string
  tags: Tag[]
  __typename: 'RepositoryType'
}
