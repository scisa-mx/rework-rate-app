import { apolloClient } from '@/graphql/apollo/ApolloInstance'
import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { type Ref, ref, watch } from 'vue'
import type { Repository } from '@/types/benchmarks/repositories'

/* ---------- Types ---------- */

export interface AssignTagsInput {
  repositoryId: string
  tagNames: string[]
}

/* ---------- GraphQL Mutation ---------- */
const ASSIGN_TAGS_TO_REPOSITORY = gql`
  mutation AssignTagsToRepository($data: AssignTagsInput!) {
    assignTagsToRepository(data: $data) {
      id
      name
      description
      repoUrl
      tags {
        id
        name
        color
      }
    }
  }
`

/**
 * Hook para asignar tags a un repositorio
 *
 * @example
 * const { mutate, loading, error, data } = useAssignTagsToRepository()
 * await mutate({ repositoryId: "abc", tagNames: ["frontend", "backend"] })
 */
export function useAssignTagsToRepository() {
  const data: Ref<Repository | null> = ref(null)
  const loading = ref(false)
  const error = ref<any>(null)

  const {
    mutate: assignMutation,
    loading: apolloLoading,
    error: apolloError,
    onDone,
  } = provideApolloClient(apolloClient)(() =>
    useMutation<{ assignTagsToRepository: Repository }, { data: AssignTagsInput }>(
      ASSIGN_TAGS_TO_REPOSITORY
    )
  )

  // Sync estados
  watch(apolloLoading, (val) => {
    loading.value = val
  })
  watch(apolloError, (val) => {
    error.value = val
  })

  onDone((res) => {
    if (res?.data?.assignTagsToRepository) {
      data.value = res.data.assignTagsToRepository
    }
  })

  /**
   * Ejecuta la mutación
   */
  const mutate = async (input: AssignTagsInput) => {
    const res = await assignMutation({ data: input })
    return res?.data?.assignTagsToRepository ?? null
  }

  return {
    data,
    loading,
    error,
    mutate,
  }
}
