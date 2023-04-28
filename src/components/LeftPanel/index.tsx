import React from 'react'
import { Props } from './type'
import Container from '../Container'
import styles from "./.module.css"

const LeftPanel: React.FC<Props> = ({categories=[], data}) => {
  console.log(data, "<<<<< datas")
  const onClickCategory = () => {

  }
  return (
    <Container className={styles["left-aside-pane"]}>
          <ul>
            <li><button><h3>All item</h3></button></li>
            {
             categories instanceof Array && categories?.map((category:string, categoryIndex:number) => (
                <li key={categoryIndex}><button onClick={onClickCategory}>{category}</button></li>
              ))
            }
          </ul>
    </Container>
  )
}

export default LeftPanel