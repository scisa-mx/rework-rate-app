export const GET_TAGS = `
query {
  getAllTags(filters: {name: "", id: ""}) {
    color
    name
    id
  }
}
`