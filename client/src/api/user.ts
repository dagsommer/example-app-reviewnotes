import axios from 'axios'

export async function getUsers() {
  const {data} = await axios.get('http://localhost:3000/users/')
  if (!data) {
    //Error handling here
    return []
  }
  return data
}
