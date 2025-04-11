export interface IdentifyBenchmark {
  author?: string
  startDate: string
  endDate: string
  timeStamp: string
}

export interface IdentifyBenchmarkRepo {
    repoUrl: string
    prNumber: number
    prAproved: number
}