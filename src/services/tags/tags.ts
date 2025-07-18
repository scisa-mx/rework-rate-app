import { executeQuery } from '../baseGraphQl'
import { GET_TAGS } from '@/graphql/tags/getTags'

export const getTags = async ({ name }: { name: string }) => {
  const res = await executeQuery(GET_TAGS, {
    filters: {
      name,
      id: '',
    },
  })
  return res.data.getAllTags
}
