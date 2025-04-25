export interface IdentifyBenchmark {
  author?: string
  periodStart: string
  periodEnd: string
  timeStamp: string
}

export interface IdentifyBenchmarkRepo {
    repoUrl: string
    prNumber: number
    prAproved: number
}