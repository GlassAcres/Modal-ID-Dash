import React from 'react'
import { CContainer, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import styles from 'src/scss/convotest.scss'

const ConvoTest = () => {
  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody className={styles.body}>
              <div className={styles['convo-header-container']}>
                <div className={styles.header}>
                  <div className={styles['convo-list-header']}></div>
                  <div className={styles['convo-list-utilities']}></div>
                </div>
              </div>
              <div className={styles['convo-list']}>
                <div className={styles['convo-card']}>
                  <div className={styles['user-icon']}></div>
                  <div className={styles['item-details']}>
                    <div className={styles.summary}>
                      Summary
                      <br />
                    </div>
                    <div className={styles['convo-assistant-name']}>ASSISTANT</div>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ConvoTest
