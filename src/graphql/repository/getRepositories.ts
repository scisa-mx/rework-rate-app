export const GET_REPOSITORIES = `
query {
  getAllRepositories(filters: {tags: [], name: ""}) {
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