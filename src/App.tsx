import { useEffect, useState } from 'react'
import styles from "./.module.css"
import Container from './components/Container/index';
import Section from './components/Section';
import Main from './components/Main';
import Nav from './components/Nav/index';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import online_store_data from '../items.json'
import { getUniqueCategory } from './helper';

const App: React.FC = () => {
  const [categories, setCategories] = useState<string[] | unknown>([])
  const getCategories = () => {
    setCategories(getUniqueCategory(online_store_data))
  }

  useEffect(getCategories, [])
  
  return (
    <Container className={styles["app-pane"]}>
      <Nav className={styles["nav-pane"]}>
          <h2>Online Shopping Store</h2>
      </Nav>
      <Main className={styles["main-pane"]}>

        <LeftPanel categories={categories} data={online_store_data}/>

        <Section className={styles["section-pane"]}>
          <h1> Contents </h1>
        </Section>
       <RightPanel/>
      </Main>
    </Container>
  )
}

export default App
