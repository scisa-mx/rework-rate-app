import { ref } from 'vue'
import type { Ref } from 'vue'
import { GET_REPOSITORIES } from '@/graphql/repository/getRepositories'
import { executeQuery } from '../baseGraphQl'
import type { Repos } from '@/types/benchmarks/repositories'

export const useRepositories = () => {
  const repositories = ref<Repos[]>([])
  const error = ref<null | unknown>(null)
  const fetchRepositories = async () => {
    try {
      const response = await executeQuery(GET_REPOSITORIES, { filters: { name: '', url: '' } })
      repositories.value = response.data.getAllRepositories as Repos[]
    } catch (err) {
      error.value = err
    }

    return { repositories, error, fetchRepositories }
  }
}
