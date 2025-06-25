import { executeQuery } from '../baseGraphQl'
import { GET_TAGS } from './querys'

export const getAllTags = async () => {
  const res = await executeQuery(GET_TAGS);
  return res.data.getAllTags;
}