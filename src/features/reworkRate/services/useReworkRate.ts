import { apolloClient } from '@/graphql/apollo/ApolloInstance'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import { type Ref, ref, watch } from 'vue'
import type { Repository } from '@/types/benchmarks/repositories'

interface RepositoryFilterInput {
  name: string | null
  tags: string | null
}

/**
 * Query para obtener todos los repositorios
 */
const GET_ALL_REPOSITORIES = gql`
  query Repositories($filters: RepositoryFilterInput) {
    getAllRepositories(filters: $filters) {
      tags {
        color
        id
        name
      }
      repoUrl
      name
      id
      description
    }
  }
`

export function useRepositories({ debounceTime = 300 }: { debounceTime?: number }) {
  const data = ref<Repository[]>([])
  const loading = ref(true)
  const error = ref<any>(null)

  let timer: ReturnType<typeof setTimeout> | null = null

  const {
    load,
    result,
    loading: apolloLoading,
    error: apolloError,
  } = provideApolloClient(apolloClient)(() => useLazyQuery(GET_ALL_REPOSITORIES))

  // Sincronizamos con refs propias
  watch(result, (val) => {
    if (val) data.value = val.getAllRepositories
  })

  watch(apolloLoading, (val) => {
    if (val) {
      // Si empieza a cargar → mostrar de inmediato
      if (timer) clearTimeout(timer)
      loading.value = true
    } else {
      // Si termina → esperar 300ms antes de ocultar
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        loading.value = false
        timer = null
      }, debounceTime)
    }
  })

  watch(apolloError, (val) => {
    error.value = val
  })

  /**
   * Función pública para disparar la query
   */
  const fetch = async (filters?: RepositoryFilterInput) => {
    const res = await load(undefined, { filters })
    return res?.data?.getAllRepositories ?? []
  }

  return {
    data,
    loading,
    error,
    fetch,
  }
}
