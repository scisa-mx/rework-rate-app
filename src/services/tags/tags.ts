import { executeQuery } from '../baseGraphQl'
import { GET_TAGS, CREATE_TAG } from './querys'

export const getAllTags = async () => {
  const res = await executeQuery(GET_TAGS)
  return res.data.getAllTags
}

export const assignTagsToReworkData = async (repoId: number, tags: string[]) => {
  const res = await executeQuery(CREATE_TAG, {
    data: {
      names: tags,
      reworkDataId: repoId,
    },
  })
  return res.data.createTag
}
