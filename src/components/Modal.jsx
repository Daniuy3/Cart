/* eslint-disable react/prop-types */
import { formatearDinero } from "../utilidades/utilidades";
import { useMemo } from "react";

import "./Modal.css";
function Modal({setmodal, cart, setCart}) {

    const totalPagar = useMemo((() => cart.reduce((total, item) => total + (item.quantity * item.price), 0)), [cart])

  return (
    <div className="modal">
        <div className="modal__container">
            <div className="modal__img-container">
                <img src="/icon-order-confirmed.svg" className="modal__img" />
            </div>
            <div className="modal__text-container">
                <h2 className="modal__heading"  > Order Confirmed</h2>
                <p className="modal__text">We hoop you enjoy your food!</p>
            </div>

            {cart.map( prod => (

            <div className="modal__prod"
                key={prod.id}    
           >
               <div className="modal__prod-img">
                   <img src={prod.image.thumbnail}/>
               </div>
               <div className="modal__prod-meta">
                   <h3 className="modal__prod-name">{prod.name}</h3>
                   <div className="modal__prod-status">
                       <p className="modal__prod-quantity">{prod.quantity}x</p>
                       <p className="modal__prod-price">@{formatearDinero(prod.price)}</p>
                   </div>
               </div>
               <p className="modal__prod-total">
                   {formatearDinero(prod.quantity*prod.price)}
               </p>
           </div>
            ))}
            <div className="modal__total">
                <p className="modal__total-text">
                    Order Total
                </p>
                <p className="modal__total-price">{formatearDinero(totalPagar)} </p>
            </div>
            <a href="#" className="modal__Button"
            /* Borro el modal y todos los elementos del carrito */
                onClick={()=> {setmodal(false); setCart([])}}
            >
                Start New Order
            </a>
        </div>
    </div>
  )
}

export default Modal