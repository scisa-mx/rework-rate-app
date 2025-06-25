export const GET_ALL_REPOS = `
query{ 
   getAllRepos{
    url
    name
  }
}   
`

export const GET_REWORK_DATA_BY_NAME = `
query GetReworkDataByName($repoUrl: String!, $tags: [String!]) {
  getReworkDataByName(repoUrl: $repoUrl, tags: $tags) {
    id
    name
    url
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
      createdAtDate
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
