import UserData from '../data/dummy-data-users.json'
import APIError from '../util/APIError'

interface User {
  id: string
  name: string
  photo: string // Base64 image
}

export function getUser(id: string): User {
  const filtered = UserData.filter((u) => u.id == id)
  if (filtered.length === 0) {
    throw APIError('Cannot find user', 'NotFound')
  }
  return filtered[0]
}

//Will ignore filtering for users for simplicity
export function list(): User[] {
  return UserData
}
