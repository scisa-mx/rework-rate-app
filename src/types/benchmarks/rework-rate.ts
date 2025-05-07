import type { IdentifyBenchmark, IdentifyBenchmarkRepo } from './benchmarks'
import type { ChartData, ChartDataset } from 'chart.js'

export interface ReworkRate extends IdentifyBenchmark, IdentifyBenchmarkRepo {
  reworkPercentage: number
  totalCommits: number
  modifyLines: number
  reworkLines: number
}

export interface ChartDataRework extends ChartData<'line'> {
  datasets: (ChartDataset<'line'> & { commits: number[] })[]
}