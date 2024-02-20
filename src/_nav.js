import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilMovie, cilSpeedometer, cilChatBubble, cilSettings, cilVector } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Demo',
    tooltip: 'Demo',
    to: '/demo',
    icon: <CIcon icon={cilMovie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Analytics',
    href: '#/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Conversations',
    href: '#/conversations',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Agents',
    href: '#/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Builder',
    href: '#/flow',
    icon: <CIcon icon={cilVector} customClassName="nav-icon" />,
  },
]

export default _nav
