export const GET_HISTORY = `
query ($repositoryId: String!, $startDate: String, $endDate: String) {
  getReworkRateHistory(repositoryId: $repositoryId, startDate: $startDate, endDate: $endDate) {
    author
    id
    createdAtDate
    modifiedLines
    periodStart
    prApprover
    periodEnd
    prNumber
    repoUrl
    reworkLines
    reworkPercentage
    timestamp
    totalCommits
  }
}
`