import type { IdentifyBenchmark, IdentifyBenchmarkRepo } from './benchmarks'

export interface ReworkRate extends IdentifyBenchmark, IdentifyBenchmarkRepo {
  reworkPercentage: number
  totalCommits: number
  modifyLines: number
  reworkLines: number
}
