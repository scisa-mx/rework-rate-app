export const GET_ALL_REPOS = `
query{ 
   getAllRepos{
    url
    name
  }
}   
`
export const GET_HISTORY_BY_REPO = `
  query GetReworkHistory($repoUrl: String!, $startDate: DateTime, $endDate: DateTime) {
    getReworkHistory(repoUrl: $repoUrl, startDate: $startDate, endDate: $endDate) {
      id
      prNumber
      author
      periodStart
      periodEnd
      reworkPercentage
      totalCommits
      timestamp
      modifiedLines
      reworkLines
      prApprover
    }
  }`

export const GET_MEAN_AND_MEDIAN = `
  query GetMeanAndMedian($repoUrl: String!, $startDate: DateTime, $endDate: DateTime) {
    getMeanAndMedian(repoUrl: $repoUrl, startDate: $startDate, endDate: $endDate) {
      mean
      median
    }
  }
`
