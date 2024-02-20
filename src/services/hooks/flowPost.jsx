// File: useWebhookSender.js


const flowPost = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json()
    console.log('Data sent to webhook:', result)
  } catch (error) {
    console.error('Error sending data to webhook:', error)
  }
}

export default flowPost
