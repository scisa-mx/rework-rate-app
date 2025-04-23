import { executeQuery } from '../baseGraphQl'
import { GET_ALL_REPOS, GET_HISTORY_BY_REPO } from './querys'
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

export const getAllRepos = async () => {
  const res = await executeQuery(GET_ALL_REPOS)
  return res.data.getAllRepos
}

export const getHistoryByRepo = async (repoUrl: string): Promise<ReworkRate[]> => {
  const res = await executeQuery(GET_HISTORY_BY_REPO, {
    repoUrl }
  )
  return res.data.getReworkHistory
}
