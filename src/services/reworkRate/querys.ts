export const GET_ALL_REPOS = `
query{ 
   getAllRepos{
    url
    name
  }
}   
`
export const GET_HISTORY_BY_REPO = `
    query GetReworkHistory($repoUrl: String!) {
      getReworkHistory(repoUrl: $repoUrl) {
        id
        prNumber
        author
        periodStart
        periodEnd
        reworkPercentage
      }
    }
  `
