import { cilXCircle } from '@coreui/icons'
import React, { useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, CButton, CIcon } from '../components/index'
import '../scss/chat_iframe.scss' // Import your SCSS stylesheet

const DefaultLayout = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false)

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible)
  }

  return (
    <div>
      <AppSidebar toggleChatbot={toggleChatbot} />

      <div className={`chatbot-iframe-container ${isChatbotVisible ? 'visible' : ''}`}>
        <iframe
          id="chatbotIframe"
          src="https://projecthermes.replit.app"
          title="Chatbot"
          className="chatbot-iframe"
        />
        <CButton>
          <CIcon
            icon={cilXCircle}
            size="xl"
            className="frame-toggle-button"
            onClick={toggleChatbot}
          />
        </CButton>
      </div>

      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-2">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
