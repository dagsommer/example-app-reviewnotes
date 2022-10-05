import axios from 'axios'
import {ReviewNoteListOptions} from '../util/ReviewNoteListOptions'

export async function getReviewNotes(options: ReviewNoteListOptions) {
  const params = {offset: 0, limit: 3, ...options}
  const {data} = await axios.get('http://localhost:3000/engagements/123/reviewnotes/', {params})
  if (!data) {
    //Error handling here
    return []
  }
  return data
}
