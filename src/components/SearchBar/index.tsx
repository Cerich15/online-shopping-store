import React, { useState, useEffect } from 'react'
import Container from "../Container"
import { Props } from './type'
import styles from "./.module.css"

const SearchBar: React.FC<Props> = ({keywordOnChange= () => {}, placeholder}) => {
  const [keyword, setKeyword] = useState<string>('')
  const onChange = (e: any) => {
    setKeyword(e.target.value)
  }
  useEffect(() => {
    keywordOnChange(keyword)
  }, [keyword])
  
  return (
    <Container className={styles["search-bar-pane"]}>
      <input value={keyword} placeholder={placeholder} onChange={onChange} />
    </Container>
  )
}

export default SearchBar