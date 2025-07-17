import type { Tag } from '@/types/benchmarks/tags'
import type { Ref } from 'vue'
import type { Repos } from '@/types/benchmarks/repositories'
import type { RepositoryReworkRate } from '@/types/benchmarks/rework-rate'

export const formatReposTags = ({ reqs, repoMetadataMap }: { reqs: Repos[], repoMetadataMap: Ref<Record<string, { tags: Tag[] }>> }) => {
  const formatted = reqs.map((repo) => {
    repoMetadataMap.value[repo.url] = {
      tags: (repo as RepositoryReworkRate).tags || [],
    }

    return {
      value: repo.url,
      label: repo.name,
    }
  })

  return formatted
}