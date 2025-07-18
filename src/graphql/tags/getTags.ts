export const GET_TAGS = `
query ($filters: TagFilter!) {
  getAllTags(filters: $filters) {
    color
    name
    id
  }
}
`