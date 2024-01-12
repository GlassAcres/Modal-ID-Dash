import axios from 'axios'

const API_BASE_URL = 'https://projecthermes.replit.app'

export const fetchThreads = async (startDate, endDate, limit = 10) => {
  try {
    const params = {}
    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate
    params.limit = limit

    const response = await axios.get(`${API_BASE_URL}/threads`, { params })
    return response.data // This will be the full array of thread objects
  } catch (error) {
    console.error('Error fetching threads', error)
    return [] // Return an empty array in case of error
  }
}
// In apiService.js
export const fetchMessages = async (threadId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages/${threadId}`)

    return response.data // This will be the array of message objects
  } catch (error) {
    console.error('Error fetching messages', error)
    return [] // Return an empty array in case of error
  }
}
