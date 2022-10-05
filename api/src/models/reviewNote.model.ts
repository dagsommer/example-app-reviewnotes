import APIError from '../util/APIError'
import ReviewNotesData from '../data/dummy-data-reviewnotes.json'

enum ReviewNoteType {
  ReviewNote = 'ReviewNote',
  Task = 'Task',
}

enum ReviewNoteStatus {
  IN_PROGRESS = 'In Progress',
  ADDRESSED = 'Addressed',
  NOT_STARTED = 'Not started',
  CLOSED = 'Closed',
  PENDING_DOCUMENTATION = 'Pending documentation',
}

enum ReviewNotePriority {
  High = 2,
  Medium = 1,
  Low = 0,
}

//Data format is different from getting users
interface ReviewNoteUser {
  $oid: string //User id
}

interface ReviewNoteDate {
  $date: string
}

export interface ReviewNote {
  assignees: ReviewNoteUser[] //ar
  isClosed: boolean
  comments: any[] //Unknown type based on provided data
  id: string
  title: string
  description: string
  sectionRef: string
  type: ReviewNoteType //enum only has ReviewNoteType, because it's the only one we know
  status: ReviewNoteStatus
  priority: ReviewNotePriority
  reporterId: ReviewNoteUser
  createdAt: ReviewNoteDate
  updatedAt: ReviewNoteDate
}

export interface ReviewNoteListOptions {
  id?: string
  offset: number
  limit: number
  reporter?: string
  assignees?: string
  date?: string
  type?: ReviewNoteType
  title?: string
  priority?: ReviewNotePriority
}

/**
 * Helper method because dummy data does not have filter methods such as DB engines usually have
 */
function getReviewNotesWithFilter(filterOptions: ReviewNoteListOptions): ReviewNote[] {
  const {offset, limit} = filterOptions

  const result = ReviewNotesData.filter((element, index, array) => {
    if (index >= offset + limit) return false
    for (const _key in filterOptions) {
      const key = _key as keyof ReviewNoteListOptions //Convince TS that key is in element (as shown above)
      const value = filterOptions[key]
      /* const elementAttribute = element[key as keyof typeof element]
      if (!elementAttribute) {
        continue
      } */

      switch (key) {
        case 'limit':
        case 'offset':
          break
        case 'id':
          if (element._id.$oid != value) return false
          break
        case 'reporter':
          if (element.reporterId.$oid != value) return false
          break
        case 'assignees':
          if (!element.assignees.includes({$oid: value as string})) return false
          break
        case 'date':
          const dueDate = new Date(element.dueDate)
          const selectedDate = new Date(value)
          if (dueDate > selectedDate) return false
          break
        case 'type':
          if (element.type != value) return false
          break
        case 'title':
          if (!element.title.startsWith(value as string)) return false
          break
        case 'priority':
          if (element.priority.sortKey != value) return false
          break
        default:
          break
      }
    }
    return true
  })
  result.splice(0, offset)
  return result.map((val) => {
    const reviewNote: ReviewNote = {
      ...val,
      id: val._id.$oid,
      type: val.type as ReviewNoteType,
      status: val.status as ReviewNoteStatus,
      priority: val.priority.sortKey,
    }
    return reviewNote
  })
}

export function getReviewNote(engagement: string, id: string): ReviewNote {
  if (!engagement) {
    throw APIError('Please provide for which engagement to get review note', 'BadInput')
  }
  //Put DB call here
  const reviewNotes = getReviewNotesWithFilter({id, offset: 0, limit: 1})
  if (reviewNotes.length == 0) {
    throw APIError('Could not find Review Note', 'NotFound')
  }
  const reviewNote = reviewNotes[0]
  return reviewNote
}

export function list(engagement: string, options: ReviewNoteListOptions): ReviewNote[] {
  if (!engagement) {
    throw APIError('Please provide for which engagement to get review note', 'BadInput')
  }
  const reviewNotes = getReviewNotesWithFilter(options)
  return reviewNotes
}
