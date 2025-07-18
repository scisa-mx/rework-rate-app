export const GET_REPOSITORIES = `
query ($filters: RepositoryFilterInput!) {
  getAllRepositories(filters: $filters) {
    repoUrl
    name
    id
    description
    tags {
      color
      id
      name
    }
  }
}
`