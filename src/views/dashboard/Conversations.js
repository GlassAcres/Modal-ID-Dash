import React, { useState, useEffect } from 'react'
import { fetchThreads, fetchMessages } from '../../services/apiService'
import { CContainer, CCol, CCard, CCardBody, CListGroup, CListGroupItem, CRow } from '@coreui/react'
import 'src/scss/conversation.scss'

const Conversations = () => {
  const [selectedThread, setSelectedThread] = useState(null)
  const [threads, setThreads] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Fetch all threads without date filtering
    fetchThreads().then(setThreads)
  }, []) // Empty dependency array to fetch threads only once

  const handleThreadClick = async (threadId) => {
    setSelectedThread(threadId)
    const fetchedMessages = await fetchMessages(threadId)
    setMessages(fetchedMessages)
  }

  return (
    <CContainer className="conversations-container">
      <CCol>
        <CRow>
          <CCol md="3" className="conversations-list">
            <CCard>
              <CCardBody>
                <CListGroup>
                  <CListGroupItem active>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">All Conversations</h5>
                    </div>
                  </CListGroupItem>
                  {threads.map((thread) => (
                    <CListGroupItem
                      key={thread.thread_id}
                      href="#"
                      onClick={() => handleThreadClick(thread.thread_id)}
                      active={thread.thread_id === selectedThread}
                    >
                      <CCol>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">Thread Topic{thread.thread_name}</h5>
                          <p className="mb-1 thread-date">
                            {new Date(thread.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </CCol>
                      {/* Format and display the date */}
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md="9" className="thread-details">
            {selectedThread && (
              <>
                <div className="message-container">
                  {messages.map((message) => (
                    <div key={message.message_id} className={`message ${message.role}`}>
                      <span className="message-content">{message.content}</span>
                      <span className="timestamp">
                        {new Date(message.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="thread-metadata">
                  <p>Thread ID: {selectedThread.thread_id}</p>
                  <p>Assistant ID: {selectedThread.assistant_id}</p>
                  <p>Status: {selectedThread.status}</p>
                  <p>Created At: {new Date(selectedThread.created_at).toLocaleString()}</p>
                  <p>Updated At: {new Date(selectedThread.updated_at).toLocaleString()}</p>
                </div>
              </>
            )}
          </CCol>
        </CRow>
      </CCol>
    </CContainer>
  )
}

export default Conversations
