export interface IdentifyBenchmark {
  author?: string
  periodStart: string
  periodEnd: string
  timeStamp: string
}

export interface IdentifyBenchmarkRepo {
    repoUrl: string
    prNumber: string
    prAproved: number
}