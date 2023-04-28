import React from 'react'
import { Props } from './type'

const Section: React.FC<Props> = ({children, className, style}) => {
  return (
    <div className={className} style={style}>{children}</div>
  )
}

export default Section