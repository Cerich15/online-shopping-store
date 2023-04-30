import { useEffect, useState } from 'react'
import styles from "./.module.css"
import Container from './components/Container/index';
import Section from './components/Section';
import Main from './components/Main';
import Nav from './components/Nav/index';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import online_store_data from '../items.json'
import { DataProps, DataPropsArray, getUniqueCategory } from './helper';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

const App: React.FC = () => {
  const [categories, setCategories] = useState<string[] | unknown>([])
  const [selectedContent, setSelectedContent] = useState<any>([])
  const [newContent, setNewContent] = useState<any>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [filteredContent, setFilteredContent] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)

  const getCategories = () => {
    setCategories(getUniqueCategory(online_store_data))
  }

  useEffect(getCategories, [])

  const onKeywordChange = (search: string) => {
    setSearchKeyword(search)
  }

  const onSelectCategory = (selected: string) => {
    const filteredData = online_store_data.filter(data => data.category === selected);
    if (selected === "all-item") {
      setSelectedContent(online_store_data)
    } else {
      setSelectedContent(filteredData);
    }
    setSelectedCategory(selected);
  }

  const onSearchFilter = () => {
    const filteredData = selectedContent.filter((data:DataProps) => data.productName.toLowerCase().includes(searchKeyword.toLowerCase()))
 
    setFilteredContent(filteredData);
  }

  const onSortClick = () => {
    const sort = selectedContent?.sort((a:DataProps, b:DataProps) => b.unitPrice - a.unitPrice)
    setNewContent(sort)
    console.log(newContent)
  }

  useEffect(() => {
    const storedItems = localStorage.getItem("products");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const onAddToCart = (content:DataProps) => {
    setCartItems((prev:DataPropsArray) => [...prev, content])
  }

  const onModalOpen = (isOpen: Boolean) => {
    setIsModalOpen(isOpen)
    console.log(isModalOpen)
  }

  useEffect(() => {
    if (selectedCategory === "all-item") {
      setSelectedContent(online_store_data);
    } else {
      const filteredData = online_store_data.filter(
        (data) => data.category === selectedCategory
      );
      setSelectedContent(filteredData);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedContent.length > 0) {
      setFilteredContent(selectedContent);
    }
  }, [selectedContent]);

  useEffect(() => {
    if (cartItems.length > 0) {
       localStorage.setItem(`products`,JSON.stringify(cartItems))
    }
  },[cartItems])

  useEffect(onSearchFilter,[searchKeyword])
  
  return (
    <Container className={styles["app-pane"]}>
      <Nav className={styles["nav-pane"]}>
          <h2>Online Shopping Store</h2>
      </Nav>
      <Main className={styles["main-pane"]}>

        <LeftPanel categories={categories} selected={onSelectCategory}/>

        <Section className={styles["section-pane"]}>
          <SearchBar placeholder="Search Items" keywordOnChange={onKeywordChange} />
          <Container className={styles["sort-pane"]}>
            <button onClick={onSortClick}>Sort Price high to low</button>
          </Container>
          <Card datas={filteredContent} content={onAddToCart}/>
        </Section>
       <RightPanel items={cartItems.reverse()} setItems={setCartItems} isModalOpen={onModalOpen}/>
      </Main>
    </Container>
  )
}

export default App
