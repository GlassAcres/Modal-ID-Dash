import axios from 'axios'

const API_BASE_URL = 'https://projecthermes.replit.app'

export const fetchThreads = async (startDate, endDate, limit = 1000) => {
  try {
    const params = {}
    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate
    params.limit = limit

    const response = await axios.get(`${API_BASE_URL}/threads`, { params })
    return response.data // Full array of thread objects
  } catch (error) {
    console.error('Error fetching threads', error)
    return [] // Empty array in case of error
  }
}

export const fetchMessages = async (threadId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages/${threadId}`)
    return response.data // Array of message objects
  } catch (error) {
    console.error('Error fetching messages', error)
    return [] // Empty array in case of error
  }
}

// Export other functions if they are part of the api_service
