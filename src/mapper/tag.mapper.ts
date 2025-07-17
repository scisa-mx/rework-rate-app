import type { Tag } from '@/types/benchmarks/tags'
import type { Ref } from 'vue'
import type { DashOptionSelect } from '@/types'


export const formatTagsToTagInput = ({
  tags,
  tagMetadataMap,
}: {
  tags: Tag[]
  tagMetadataMap: Ref<Record<string, { label: string; color: string }>>
}): DashOptionSelect[] => {
  const formatted = tags.map((tag) => {
    tagMetadataMap.value[tag.id] = {
      label: tag.name,
      color: tag.color,
    }

    return {
      value: tag.id,
      label: tag.name,
      color: tag.color,
    }
  })

  return formatted
}

