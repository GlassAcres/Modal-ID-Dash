import React from 'react'
import PropTypes from 'prop-types' // Import PropTypes
import { useSelector, useDispatch } from 'react-redux'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import navigation from '../_nav'

const AppSidebar = ({ toggleChatbot }) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const toggleSidebar = () => {
    dispatch({ type: 'set', sidebarShow: false })
  }

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <div style={{ marginLeft: 'auto' }}>
            <img
              src={`${process.env.PUBLIC_URL}/ModalIDLogo.png`}
              alt="Modal ID Logo"
              height={55}
              width={150}
            />
          </div>
        </CSidebarBrand>
      </CSidebarHeader>

      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav
            items={navigation}
            toggleChatbot={toggleChatbot}
            toggleSidebar={toggleSidebar}
          />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}
AppSidebar.propTypes = {
  toggleChatbot: PropTypes.func.isRequired,
}

export default React.memo(AppSidebar)
