import { executeQuery } from '../baseGraphQl'
import { GET_REPOS, GET_HISTORY_BY_REPO, GET_MEAN_AND_MEDIAN, GET_REWORK_DATA_BY_NAME } from './querys'
import type { ReworkRate } from '@/types/benchmarks/rework-rate'

const datapoints = [12.3, 10.1, 8.5, 9.0, 7.4, 6.2, 5.8, 6.5, 7.1, 8.3, 9.2, 10.0]
const labels = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

type ResponseGetReworkRate = {
  labels: string[]
  datasets: number[]
}

// => [{rework-rate}]

// TODO: Despues implementar esto con graphql
export const getReworkRate = async (): Promise<ResponseGetReworkRate> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        labels,
        datasets: datapoints,
      })
    }, 1000)
  })
}

export const getReworkData = async () => {
  const query = `
    query {
      getReworkData {
        id
        repoUrl
      }
    }
  `
  const res = await executeQuery(query)
  return res.data.getReworkData
}

export const getRepos = async () => {
  const res = await executeQuery(GET_REPOS)
  return res.data.getRepos
}

export const getReworkDataByName = async (repoUrl: string, tags: string[]) => {
  const res = await executeQuery(GET_REWORK_DATA_BY_NAME, { repoUrl, tags })
  return res.data.getReworkDataByName
}

export const getHistoryByRepo = async (
  repoUrl: string,
  startDate: string | null,
  endDate: string | null,
): Promise<ReworkRate[]> => {
  const res = await executeQuery(GET_HISTORY_BY_REPO, {
    repoUrl,
    startDate,
    endDate,
  })
  return res.data.getReworkHistory
}

export const getMeanAndMedian = async (
  repoUrl: string,
  startDate: string | null,
  endDate: string | null,
) => {
  const res = await executeQuery(GET_MEAN_AND_MEDIAN, {
    repoUrl,
    startDate,
    endDate,
  })
  return res.data.getMeanAndMedian
}

export const getReposByTags = async (tags: string[]) => {
  const query = `
    query($tags: [String!]!) {
      getReworkDataByName(tags: $tags) {
        id
        repoUrl
      }
    }
  `
  const res = await executeQuery(query, { tags })
  return res.data.getReposByTags
}
