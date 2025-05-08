import type { IdentifyBenchmark, IdentifyBenchmarkRepo } from './benchmarks'
import type { ChartData, ChartDataset } from 'chart.js'

export interface ReworkRate extends IdentifyBenchmark, IdentifyBenchmarkRepo {
  reworkPercentage: number
  totalCommits: number
  modifiedLines: number
  reworkLines: number
  timestamp: string
  author: string
}

export interface ChartDataRework extends ChartData<'line'> {
  datasets: (ChartDataset<'line'> & {
    commits: number[]
    authors: string[]
    prNumbers: string[]
    periodsStart: string[]
    periodsEnd: string[]
    totalCommits: number[]
    timestamps: string[]
    reworkLines: number[]
    modifiedLines: number[]
  })[]
}
