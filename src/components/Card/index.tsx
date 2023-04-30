import React from 'react'
import Container from '../Container'
import { MyFunctionType, Props } from './type'
import styles from "./.module.css"
import { DataProps } from '../../helper'

const Card: React.FC<Props> = ({datas=[], content=()=>{}}) => {

 const onAddCartClick: MyFunctionType = (data:DataProps) => () => {
    content(data)
 }

  return (
    <Container className={styles["card-pane"]}>
        {
            datas?.map((data, indexData) => (
                <Container className={styles["card-item-pane"]}  key={indexData}>
                    <Container className={styles["img-pane"]}>
                        <img src={data.imageUrl} alt=''/>
                    </Container>
                    <Container className={styles["item-desc-pane"]}>
                        <h4>{data.productName}</h4>
                        <h5>{data.category}</h5>
                        <span>{data.description}</span>
                    </Container>
                    <Container className={styles["price-pane"]}>
                        <h4>₱{data.unitPrice}</h4>
                        <button onClick={onAddCartClick(data)}>Add to cart</button>
                    </Container>
                </Container>
            ))
        }
    </Container>
  )
}

export default Card