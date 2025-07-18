import type { Tag } from '@/types/benchmarks/tags'
import type { Ref } from 'vue'
import type { Repository } from '@/types/benchmarks/repositories'
import type { RepositoryReworkRate } from '@/types/benchmarks/rework-rate'
import type { DashOptionSelect } from '@/types'

export const formatReposTags = ({
  reqs,
  repoMetadataMap,
}: {
  reqs: Repository[]
  repoMetadataMap: Ref<Record<string, { tags: Tag[] }>>
}) => {
  const formatted = reqs.map((repo) => {
    repoMetadataMap.value[repo.repoUrl] = {
      tags: (repo as Repository).tags || [],
    }

    return {
      value: repo.repoUrl,
      label: repo.name,
    }
  })

  return formatted
}

export const formatRepositoriesToDashOptions = ({
  repositories,
}: {
  repositories: Repository[]
}): DashOptionSelect[] => {
  const formatted = repositories.map((repo) => {
    return {
      value: repo.repoUrl,
      label: repo.name,
      disabled: false,
    }
  })

  return formatted as DashOptionSelect[]
}
