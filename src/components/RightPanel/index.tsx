import React, { useState, useEffect } from 'react'
import { MyFunctionType, Props } from './type'
import Container from '../Container'
import styles from "./.module.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { DataProps } from '../../helper'

const RightPanel: React.FC<Props> = ({items, setItems, isModalOpen=()=>{}}) => {

  const updatedItemsProp = items.map((item:any) => ({ ...item, quantity: item.quantity ? item.quantity : 1 }));
  const [modal, setModal] = useState<Boolean>(false)

  const onRemoveClick = (id:string, index: number) => () => {
    const updatedItems = items.filter((item: DataProps, i: number) => {
      return item.id !== id || i !== index;
    });
    localStorage.setItem('products', JSON.stringify(updatedItems))
    setItems(updatedItems);
  }

  const onSetCounter: MyFunctionType = (id: string, action:string, quantity:number, index:number) => () => {
    let new_quantity = 0;
    
    if (action === "+") {
      new_quantity = quantity + 1
    } else if (action === "-") {
      if (quantity === 0) return new_quantity = 0
      new_quantity = quantity - 1
    }

    const updatedItems = [...updatedItemsProp];
    updatedItems[index].quantity = new_quantity;
    const localStorageData = JSON.parse(localStorage.getItem("products") || "");
    const itemIndex = localStorageData.findIndex((item: any) => item.id === id);
    
    localStorageData[itemIndex].quantity = new_quantity;
    
    localStorage.setItem('products', JSON.stringify(localStorageData));
    setItems(localStorageData)

  }

  const onClearCartClick = () => {
    const clear:[] = []
    localStorage.setItem('products', JSON.stringify(clear))
    setItems(clear)
  }

  const getTotalItems = () => {
    let total = 0
    updatedItemsProp.map(item => (
      total+=item.quantity
    ))

    return total
  }

  const getTotalAmount = () => {
    let total = 0
    updatedItemsProp.map(item => (
      total = (item.unitPrice * item.quantity) + total
    ))

    return total.toFixed(2)
  }

  const onCheckoutClick = () => {
    setModal(!modal)
    onClearCartClick()
  }

  const onCloseModal = () => {
    setModal(!modal)
  }

  const isModal = () => {
    isModalOpen(modal)
  }

  useEffect(isModal,[modal])

  return (
    <Container className={styles["right-aside-pane"]}>
          {
            modal ? 
              <Container className={styles["modal"]}>
                <Container className={styles["icon-pane"]}>
                  <AiFillCloseCircle onClick={onCloseModal} className={styles["icon"]}/>
                </Container>
                <Container className={styles["message-pane"]}>
                 <h2>Thank you for Puchasing</h2>
                </Container>
              </Container> : ""
          }
          <Container className={styles["box"]}>
            <Container className={styles["label"]}>
              <h4>My Cart</h4>
            </Container>
            <Container className={styles["clear"]}>
              <button onClick={onClearCartClick}><h4>Clear Cart</h4></button>
            </Container>
          </Container>
          <Container className={styles["cart"]}>
            {
              updatedItemsProp.map((item:any, itemIndex:number) => (
                  <Container className={styles["cart-item"]} key={itemIndex}>
                    <img src={item.imageUrl} alt=''/>
                    <Container className={styles["details"]}>
                      <p>{item.productName}</p>
                      <h5>₱{item.unitPrice}</h5>
                    </Container>
                    <Container className={styles["quantity"]}>
                      <button onClick={onSetCounter(item.id, "-", item.quantity, itemIndex)}>-</button>
                      <p>{item.quantity}</p>
                      <button onClick={onSetCounter(item.id, "+", item.quantity, itemIndex)}>+</button>
                    </Container>
                    <Container className={styles["remove-pane"]}>
                      <AiFillCloseCircle onClick={onRemoveClick(item.id, itemIndex)} className={styles["icon"]}/>
                    </Container>
                  </Container>
              ))
            }
          </Container>
          <Container className={styles["checkout-pane"]}>
              <Container className={styles["total-items-pane"]}>
                <p>Total items:</p>
                <h4>{getTotalItems()}</h4>
              </Container>
              <Container className={styles["total-amount-pane"]}>
                <p>Total amount:</p>
                <h4>₱{getTotalAmount()}</h4>
              </Container>
              <Container className={styles["checkout-btn-pane"]}>
                <button onClick={onCheckoutClick}>Checkout</button>
              </Container>
          </Container>
    </Container>
  )
}

export default RightPanel