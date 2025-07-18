import { ref } from 'vue'
import { GET_HISTORY } from '@/graphql/reworkRate/getHistory'
import { executeQuery } from '@/services/baseGraphQl'
// import type { Ref } from 'vue'
import type { ReworkRate } from '@/types/benchmarks/rework-rate'

export function useReworkRate() {
  const reworkRateHistory = ref<ReworkRate[]>([])

  const getHistory = async ({
    repositoryUrl,
    startDate = null,
    endDate = null,
  }: {
    repositoryUrl: string
    startDate: string | null
    endDate: string | null
  }) => {
    try {
      const response = await executeQuery(GET_HISTORY, {
        repositoryUrl,
        startDate,
        endDate,
      })
      reworkRateHistory.value = response.data.getReworkRateHistory
      return response.data.getReworkRateHistory
    } catch (error) {
      console.error('Error fetching rework rate history:', error)
      throw error
    }
  }

  return {
    getHistory,
    reworkRateHistory,
  }
}
