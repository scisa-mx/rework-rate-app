import { ref } from 'vue'
import type { Ref } from 'vue'
import { GET_REPOSITORIES } from '@/graphql/repository/getRepositories'
import { ASSING_TAG_TO_REPOSITORY } from '@/graphql/repository/assingTags'
import { executeQuery } from '../baseGraphQl'
import type { Repository } from '@/types/benchmarks/repositories'

export function useRepositories() {
  const repositories = ref<Repository[]>([])
  const error = ref<null | unknown>(null)
  // Optional parameters for filtering repositories
  const fetchRepositories = async ({
    name = '',
    tags = [],
  }: {
    name?: string
    tags?: string[]
  }) => {
    try {
      const response = await executeQuery(GET_REPOSITORIES, { filters: { name, tags } })
      repositories.value = response.data.getAllRepositories as Repository[]
    } catch (err) {
      error.value = err
    }
  }

  const assingTagsToRepositories = async ({
    repositoriesList,
    repositoryUrl,
    tagNames,
  }: {
    repositoriesList: Repository[]
    repositoryUrl: string
    tagNames: string[]
  }) => {
    const id = repositoriesList.find(repo => repo.repoUrl === repositoryUrl)?.id
    debugger
    if (!id) {
      return Promise.reject(new Error('Repository not found'))
    }
    debugger
    return executeQuery(ASSING_TAG_TO_REPOSITORY, {
      data: {
        repositoryId: id,
        tagNames,
      },
    })
  }

  return { repositories, error, fetchRepositories, assingTagsToRepositories }
}
