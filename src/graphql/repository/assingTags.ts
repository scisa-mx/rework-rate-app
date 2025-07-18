export const ASSING_TAG_TO_REPOSITORY = `
mutation ($data: AssingTagsInput!) {
  assignTagsToRepository(data: $data) {
    description
    id
    name
    repoUrl
    tags {
      color
      id
      name
    }
  }
}
`

