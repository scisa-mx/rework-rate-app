// useReworkHistory.ts
import { apolloClient } from '@/graphql/apollo/ApolloInstance'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref, watch } from 'vue'
import type { ReworkRate } from '@/types/benchmarks/rework-rate'

/**
 * DTO con los filtros del query
 */
export interface HistoryFilterInput {
  repoUrl: string // obligatorio
  startDate?: string | null // ISO string compatible con DateTime
  endDate?: string | null
}

/**
 * DTO para el resultado del query
 */
export interface ReworkHistory {
  author: string
  createdAtDate: string
  modifiedLines: number
  id: string
  periodStart: string
  periodEnd: string
  prApprover: string
  prNumber: number
  reworkLines: number
  repoUrl: string
  reworkPercentage: number
  tags: string[]
  timestamp: string
  totalCommits: number
}

/**
 * GraphQL query para obtener el histórico de rework
 */
const REWORK_HISTORY_QUERY = gql`
  query History($repoUrl: String!, $startDate: DateTime, $endDate: DateTime) {
    getReworkHistory(repoUrl: $repoUrl, startDate: $startDate, endDate: $endDate) {
      author
      createdAtDate
      modifiedLines
      id
      periodStart
      periodEnd
      prApprover
      prNumber
      reworkLines
      repoUrl
      reworkPercentage
      tags
      timestamp
      totalCommits
    }
    getMeanAndMedian(repoUrl: $repoUrl, startDate: $startDate, endDate: $endDate) {
      mean
      median
    }
  }
`

/**
 * Hook para obtener el histórico de rework de un repositorio
 * Usa lazyQuery para disparar la consulta bajo demanda
 */
export function useReworkHistory(initialFilters: HistoryFilterInput) {
  const data = ref<ReworkRate[]>([])
  const mean_and_median = ref<{ mean: number; median: number } | null>(null)
  const loading = ref(true)
  const error = ref<any>(null)

  const {
    load,
    result,
    loading: apolloLoading,
    error: apolloError,
  } = provideApolloClient(apolloClient)(() =>
    useLazyQuery(REWORK_HISTORY_QUERY, {
      repoUrl: initialFilters.repoUrl,
      startDate: initialFilters.startDate ?? null,
      endDate: initialFilters.endDate ?? null,
    })
  )

  // Sincronizamos con refs locales
  watch(result, (val) => {
    if (val?.getReworkHistory) {
      data.value = val.getReworkHistory
    }
    if (val?.getMeanAndMedian) {
      mean_and_median.value = val.getMeanAndMedian
    }
  })

  watch(apolloLoading, (val) => {
    loading.value = val
  })

  watch(apolloError, (val) => {
    error.value = val
  })

  /**
   * Método para disparar la query bajo demanda
   */
  const fetch = async (filters: HistoryFilterInput) => {
    const res = await load(undefined, {
      repoUrl: filters.repoUrl,
      startDate: filters.startDate ?? null,
      endDate: filters.endDate ?? null,
    })
    return res?.data?.getReworkHistory ?? []
  }

  return {
    data,
    mean_and_median,
    loading,
    error,
    fetch,
  }
}
