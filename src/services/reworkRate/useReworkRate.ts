import { ref } from 'vue'
import { GET_HISTORY } from '@/graphql/reworkRate/getHistory'
import { executeQuery } from '@/services/baseGraphQl'
// import type { Ref } from 'vue'
import type { ReworkRate } from '@/types/benchmarks/rework-rate'

export function useReworkRate() {
  const reworkRateHistory = ref<ReworkRate[]>([])

  const getHistory = async ({
    repoUrl,
    startDate = null,
    endDate = null,
  }: {
    repoUrl: string
    startDate: string | null
    endDate: string | null
  }) => {
    try {
      const response = await executeQuery(GET_HISTORY, {
        repoUrl,
        startDate,
        endDate,
      })
      reworkRateHistory.value = response.data.getReworkHistory
      return response.data.getReworkHistory
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
