/* eslint-disable react/prop-types */
import "./Cart.css";
import {formatearDinero} from "./../utilidades/utilidades"
import { useMemo } from "react";

function Cart({cart, removeElement, setmodal}) {

  const isEmpty = useMemo((() => cart.length === 0), [cart]);
  const cartTotalQuantity = useMemo((() => cart.reduce((total, item) => total + (item.quantity), 0)), [cart])
  const totalPagar = useMemo((() => cart.reduce((total, item) => total + (item.quantity * item.price), 0)), [cart])
  
  if(isEmpty){
    return (
   
      <div className="cart">
          <h2 className="cart__heading">Your cart ({0})</h2>
          <img className="cart__img" src="/illustration-empty-cart.svg" alt="" />
          <p className="cart__text">Your added items will appear here</p>
      </div>
    )
  }else{
    return (
   
      <div className="cart">
          <h2 className="cart__heading">Your cart ({cartTotalQuantity})</h2>
          {cart.map(prod => (
            <div className="cart__prod"
                 key={prod.id}  
            >
              <div className="cart__info">
                <h3 className="cart__name">{prod.name}</h3>
  
                <div className="cart__meta">
                  <p className="cart__quantity">{prod.quantity}x</p>
                  <p className="cart__price">@{formatearDinero(prod.price)}</p>
                  <p className="cart__total">{formatearDinero(prod.price * prod.quantity)}</p>
                </div>
              </div>
              <a className="cart__remove"
                  onClick={() => removeElement(prod.id)}
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path className="cart__svg" fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
              </a>
            </div>
          ))}

          <div className="cart__total-container">
            <p className="cart__total-text">Order Total</p>
            <p className="cart__total-pagar">{formatearDinero(totalPagar)}</p>
          </div>
          <div className="carbon">
            <img src="/icon-carbon-neutral.svg" alt="" />
            <p className="carbon__text">This is a <span>carbon-neutral</span> delivery</p>
          </div>
          <a className="cart__confirm-button"
              onClick={() => setmodal(true)}
          >
            Confirm Order
          </a>
      </div>
   
    )
  }
  
}

export default Cart