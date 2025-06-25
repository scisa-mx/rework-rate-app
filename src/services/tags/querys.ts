export const GET_TAGS = `
query {
  getAllTags {
    id
    name
  }
}
`

export const CREATE_TAG = `
mutation CreateTag($data: TagInput!) {
  updateTags(data: $data) {
    id
    name
  }
}
`
