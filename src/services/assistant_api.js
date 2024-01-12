import axios from 'axios'

const API_BASE_URL = 'https://projecthermes.replit.app'

export const fetchAssistants = async (startDate, endDate, limit = 20) => {
  try {
    const params = {}
    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate
    params.limit = limit

    const response = await axios.get(`${API_BASE_URL}/assistants`, { params })
    return response.data // This will be the full array of assistant objects
  } catch (error) {
    console.error('Error fetching assistants', error)
    return [] // Return an empty array in case of error
  }
}

export const fetchAssistantDetails = async (assistantId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assistants/${assistantId}`)
    return response.data // This will be the assistant's details
  } catch (error) {
    console.error('Error fetching assistant details', error)
    return null // Return null in case of error
  }
}

// Update assistant details
export const updateAssistant = async (assistantId, assistantDetails) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/assistants/${assistantId}/update`,
      assistantDetails,
    )
    console.log(response.data)
    return response.data
    // This will be the updated assistant object
  } catch (error) {
    console.error('Error updating assistant', error)
    throw error // Throw the error to be handled by the calling function
  }
}
