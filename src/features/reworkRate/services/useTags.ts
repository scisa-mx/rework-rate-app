import { apolloClient } from '@/graphql/apollo/ApolloInstance'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { Tag } from '@/types/benchmarks/tags'

import { type Ref, ref, watch } from 'vue'

/* ---------- Types ---------- */


interface TagFilter {
  name: string | null
  id: string | null
}

/* ---------- GraphQL Query ---------- */
const GET_ALL_TAGS = gql`
  query GetTags($filters: TagFilter) {
    getAllTags(filters: $filters) {
      id
      name
      color
    }
  }
`

/**
 * Hook para obtener tags, usando lazyQuery para ejecutarse cuando tú lo decidas.
 *
 * @param filters objeto opcional { name, id }
 * @returns objeto con data, loading, error y fetch()
 *
 * @example
 * const { data, loading, error, fetch } = useTags()
 * await fetch({ name: "frontend", id: null })
 */
export function useTags({
  filters,
  debounceTime,
}: {
  filters?: TagFilter
  debounceTime?: number
}) {
  const data: Ref<Tag[]> = ref([])
  const loading = ref(true)
  const error = ref<any>(null)
  let timer: ReturnType<typeof setTimeout> | null = null

  // Lazy query
  const {
    load,
    result,
    loading: apolloLoading,
    error: apolloError,
  } = provideApolloClient(apolloClient)(() => useLazyQuery(GET_ALL_TAGS))

  // Sincronizamos resultados con data
  watch(result, (val) => {
    if (val) data.value = val.getAllTags
  })

  // Sync estados
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
   * Dispara la query
   * @param filters objeto opcional { name, id }
   */
  const fetch = async (filters?: TagFilter) => {
    const res = await load(undefined, { filters })
    return res?.data?.getAllTags ?? []
  }

  return {
    data,
    loading,
    error,
    fetch,
  }
}
