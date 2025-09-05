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

/**
 * Hook para obtener repositorios, usando lazyQuery para poder ejecutar en cualquier momento del lifecycle.
 * @param filters objeto con filtros opcionales (ej. { name: "PLD", tags: "PLD-sass" })
 * @returns objeto con propiedades reactivas: data, loading, error, fetch
 * @example
 * const { data, loading, error, fetch } = useRepositories({ name: "PLD", tags: "PLD-sass" })
 * fetch(({ name: null, tags: null }) // Ejecuta la query con nuevos filtros
 * console.log(data) // Se muestra los datos
 */
export function useRepositories(filters?: RepositoryFilterInput) {
  const data = ref<Repository[]>([])
  const loading = ref(true)
  const error = ref<any>(null)

  // Lazy query (no corre hasta que llames .load)
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
    loading.value = val
  })

  watch(apolloError, (val) => {
    error.value = val
  })

  /**
   * Función pública para disparar la query
   * @param filters objeto opcional { name, tags }
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
