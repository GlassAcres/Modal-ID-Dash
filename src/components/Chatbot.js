import React, { useState } from 'react'

const Chatbot = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            /* Add other styles for the container */
          }}
        >
          <iframe
            id="chatbotIframe"
            src="https://projecthermes.replit.app"
            title="Chatbot"
            style={{
              width: '300px', // Adjust width
              height: '600px', // Adjust height
              /* Add other styles for the iframe */
            }}
          />
          <button
            onClick={toggleVisibility}
            style={{
              position: 'relative',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              // Use a Unicode chevron character
              // Or, you can use an icon from an icon library
            }}
          >
            &#x25B2; {/* Chevron Up Unicode character */}
          </button>
        </div>
      )}
      {!isVisible && <button onClick={toggleVisibility}>Open Chatbot</button>}
    </>
  )
}

export default Chatbot
