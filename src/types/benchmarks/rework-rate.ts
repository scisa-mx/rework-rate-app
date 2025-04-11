import type { IdentifyBenchmark, IdentifyBenchmarkRepo } from './benchmarks'

export interface ReworkRate extends IdentifyBenchmark, IdentifyBenchmarkRepo {
  reworkRate: number
  totalCommits: number
  modifyLines: number
  reworkLines: number
}
