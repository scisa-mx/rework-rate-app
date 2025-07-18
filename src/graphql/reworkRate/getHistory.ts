export const GET_HISTORY = `
  query GetReworkHistory($repoUrl: String!, $startDate: DateTime, $endDate: DateTime) {
    getReworkHistory(repoUrl: $repoUrl, startDate: $startDate, endDate: $endDate) {
      id
      author
      createdAtDate
      modifiedLines
      periodStart
      periodEnd
      prApprover
      prNumber
      repoUrl
      reworkLines
      reworkPercentage
      timestamp
      totalCommits
    }
  }
`
