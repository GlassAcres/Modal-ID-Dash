// Conversations.js
import React, { useState, useEffect, useCallback } from 'react'
import { fetchThreads, fetchMessages } from '../../services/apiService'
import {
  CContainer,
  CCol,
  CCard,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CDropdown,
  CRow,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import 'src/scss/conversation.scss'

const Conversations = () => {
  const [selectedThread, setSelectedThread] = useState(null)
  const [threads, setThreads] = useState([])
  const [messages, setMessages] = useState([])
  const [dateRange, setDateRange] = useState('Last 7 days')
  const [resultsLimit, setResultsLimit] = useState(10)

  // Calculate the initial dates for the last 7 days
  const initialStartDate = new Date()
  initialStartDate.setDate(initialStartDate.getDate() - 7)
  const initialEndDate = new Date()

  const [currentStartDate, setCurrentStartDate] = useState(initialStartDate)
  const [currentEndDate, setCurrentEndDate] = useState(initialEndDate)

  const fetchThreadsByDateRange = useCallback((start, end, limit) => {
    const formattedStart = start.toISOString().split('T')[0]
    const formattedEnd = end.toISOString().split('T')[0]
    fetchThreads(formattedStart, formattedEnd, limit).then(setThreads)
  }, [])

  useEffect(() => {
    fetchThreadsByDateRange(currentStartDate, currentEndDate, resultsLimit)
  }, [currentStartDate, currentEndDate, resultsLimit, fetchThreadsByDateRange])

  const handleDateRangeSelection = (option) => {
    let start = new Date()
    let end = new Date()

    switch (option) {
      case 'Today':
        start.setHours(0, 0, 0, 0) // Start of today
        end.setHours(23, 59, 59, 999) // End of today
        break
      case 'Last 7 Days':
        start.setDate(start.getDate() - 6) // 7 days including today
        start.setHours(0, 0, 0, 0) // Start of the 7th day from today
        end.setHours(23, 59, 59, 999) // End of today
        break
      case 'Last 30 Days':
        start.setDate(start.getDate() - 29) // 30 days including today
        start.setHours(0, 0, 0, 0) // Start of the 30th day from today
        end.setHours(23, 59, 59, 999) // End of today
        break
      default:
        break
    }

    setCurrentStartDate(start)
    setCurrentEndDate(end)
    setDateRange(option)
  }

  const handleResultsLimitSelection = (limit) => {
    setResultsLimit(limit)
    fetchThreadsByDateRange(currentStartDate, currentEndDate, limit)
  }

  const handleThreadClick = async (threadId) => {
    setSelectedThread(threadId)
    const fetchedMessages = await fetchMessages(threadId)
    setMessages(fetchedMessages)
  }

  return (
    <CContainer className="conversations-container">
      <CCol>
        <CRow>
          <CRow>
            <CDropdown className="form-inputs">
              <CDropdownToggle color="secondary">{dateRange}</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleDateRangeSelection('Custom')}>
                  Custom
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDateRangeSelection('Today')}>
                  Today
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDateRangeSelection('Last 7 Days')}>
                  Last 7 Days
                </CDropdownItem>
                <CDropdownItem onClick={() => handleDateRangeSelection('Last 30 Days')}>
                  Last 30 Days
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown className="form-inputs">
              <CDropdownToggle color="secondary">{resultsLimit} Results</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleResultsLimitSelection(5)}>
                  5 Results
                </CDropdownItem>
                <CDropdownItem onClick={() => handleResultsLimitSelection(10)}>
                  10 Results
                </CDropdownItem>
                <CDropdownItem onClick={() => handleResultsLimitSelection(20)}>
                  20 Results
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CRow>
          <CCol md="3" className="conversations-list">
            <CCard>
              <CCardBody>
                <CListGroup className="list-item">
                  {threads.map((thread) => (
                    <CListGroupItem
                      key={thread.thread_id}
                      onClick={() => handleThreadClick(thread.thread_id)}
                      active={thread.thread_id === selectedThread}
                    >
                      Thread {thread.thread_id}
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
