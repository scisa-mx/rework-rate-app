// composables/useTags.ts
import { ref } from 'vue'
import { GET_TAGS } from '@/graphql/tags/getTags'
import { executeQuery } from '../baseGraphQl'
import type { Tag } from '@/types/benchmarks/tags'

export function useTags() {
  const tags = ref<Tag[]>([])
  const tagsNames = ref<string[]>([])
  const error = ref<null | unknown>(null)

  const fetchTags = async (p0: { name: string }) => {
    try {
      const response = await executeQuery(GET_TAGS, { filters: { name: '', id: '' } })
      tags.value = response.data.getAllTags as Tag[]
      tagsNames.value = tags.value.map((tag) => tag.name)
    } catch (err) {
      error.value = err
    }
  }

  return { tags, tagsNames, error, fetchTags }
}
