import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilMovie, cilSpeedometer, cilChatBubble, cilSettings } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Demo',
    to: '/demo',
    icon: <CIcon icon={cilMovie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dashboard Overview',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Conversations',
    to: '/conversations',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Chatbot Settings',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav
