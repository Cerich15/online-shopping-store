import React from 'react'
import { Props } from './type'
import Container from '../Container'
import styles from "./.module.css"

const RightPanel: React.FC<Props> = ({children}) => {
  return (
    <Container className={styles["right-aside-pane"]}>
          <h1>Right sideee</h1>
          {children}
    </Container>
  )
}

export default RightPanel