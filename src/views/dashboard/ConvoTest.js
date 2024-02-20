import React from 'react'
import { CListGroup, CListGroupItem, CContainer, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import styles from 'src/scss/convotest.scss'

const ConvoTest = () => {
  return (
    <CContainer fluid className={styles.convoContainer}>
      <CRow className={styles.fullHeightRow}>
        {/* Threads List Column */}
        <CListGroup>
          <CListGroupItem component="a" href="#" active>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
              blandit.
            </p>
            <small>Donec id elit non mi porta.</small>
          </CListGroupItem>
          <CListGroupItem component="a" href="#">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-medium-emphasis">3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
              blandit.
            </p>
            <small className="text-medium-emphasis">Donec id elit non mi porta.</small>
          </CListGroupItem>
          <CListGroupItem component="a" href="#">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small className="text-medium-emphasis">3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
              blandit.
            </p>
            <small className="text-medium-emphasis">Donec id elit non mi porta.</small>
          </CListGroupItem>
        </CListGroup>

        {/* Conversation Display Column */}
        <CCol md={6} className={styles.conversationColumn}>
          <CCard>
            <CCardBody>
              {/* Placeholder for conversation content */}
              <div className={styles.conversationContent}>Conversation goes here...</div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* User Information Column */}
        <CCol md={3} className={styles.userInfoColumn}>
          <CCard>
            <CCardBody>
              {/* Placeholder for user information */}
              <div className={styles.userInfo}>User Name</div>
              <div className={styles.userInfo}>Other Details...</div>
              {/* Add more user info here */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ConvoTest
