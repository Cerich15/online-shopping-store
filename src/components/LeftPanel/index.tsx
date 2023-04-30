import React, { useEffect, useState } from 'react'
import { MyFunctionType, Props } from './type'
import Container from '../Container'
import styles from "./.module.css"

const LeftPanel: React.FC<Props> = ({categories=[], selected=()=>{}}) => {
  const [itemClicked, setItemClicked] = useState<string>('all-item')

  const onClickCategory: MyFunctionType = (category: string) => () => {
    setItemClicked(category)
    selected(category)
  }

  useEffect(() => {
    selected(itemClicked)
  },[])

  return (
    <Container className={styles["left-aside-pane"]}>
          <ul>
            <li>
              <button 
                onClick={onClickCategory("all-item")}
                style={{
                  backgroundColor: itemClicked === "all-item" ? "aquamarine" : ""
                }}
                >
                <h3>All item</h3>
              </button>
            </li>
            {
             categories instanceof Array && categories?.map((category:string, categoryIndex:number) => (
                <li key={categoryIndex}>
                  <button
                    style={{
                      backgroundColor: itemClicked === category ? "aquamarine" : ""
                    }}
                    
                    disabled={itemClicked === category ? true : false}
                    onClick={onClickCategory(category)}>
                    {category}
                  </button>
                </li>
              ))
            }
          </ul>
    </Container>
  )
}

export default LeftPanel