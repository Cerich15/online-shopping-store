import React from 'react'
import { Props } from './type'

const Nav: React.FC<Props> = ({children, className, style}) => {
  return (
    <nav className={className} style={style}>{children}</nav>
  )
}

export default Nav