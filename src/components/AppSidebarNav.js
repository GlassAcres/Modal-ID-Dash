import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

export const AppSidebarNav = ({ items, toggleChatbot, toggleSidebar }) => {
  const location = useLocation()

  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component

    // Handler for toggling chatbot and sidebar
    const handleDemoClick = (e) => {
      if (name === 'Demo') {
        e.preventDefault() // Prevent default action (navigation) only for 'Demo'
        toggleChatbot()
        toggleSidebar()
      }
    }

    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
            onClick: handleDemoClick, // Attach the click handler to all nav items
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge, indent)}
      </Component>
    )
  }

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component
        compact
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  toggleChatbot: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
}
