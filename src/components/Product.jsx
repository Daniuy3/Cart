/* eslint-disable react/prop-types */
import "./Product.css"
import {formatearDinero} from "./../utilidades/utilidades"
import { useMemo } from "react";
function Product({prod, addToCart, increaseProd, decreaseProd, cart}) {
   
 
    const isEmpty = useMemo((() => cart.length === 0), [cart]);

    const {name, category, price, image} = prod;
    const {mobile, tablet, desktop} = image;

    const width = window.innerWidth;

    let srcImage =  mobile;

    if(width > 768 && width < 1024){
        srcImage =  tablet;
    }
    else if(width >1024){
        srcImage =  desktop;
    }

    if(!prod.quantity || prod.quantity === 0 || isEmpty){
        return (
            <div className="prod">
        
                <div className="prod__img">
                    <img src={srcImage} alt="Imagen Comida" />
                </div>
        
                <a className="prod__button"
                   onClick={() => addToCart(prod)}
                >
                    <img src="/icon-add-to-cart.svg" alt="" />
                    <p>Add to Cart</p>
                </a>
        
                <div className="prod__meta">
                    <p className="prod__category">{category}</p>
                    <p className="prod__name">{name}</p>
                    <p className="prod__price">{formatearDinero(price)}</p>
                </div>
            </div>
          )
    }
    else{
        return (
            <div className="prod">
        
                <div className="prod__img">
                    <img src={srcImage} alt="Imagen Comida" />
                </div>
        
                <a className="prod__button prod__button--active"
                >   
                    <div className="prod__svg-container"
                         onClick={() => decreaseProd(prod.id)}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path className="button__svg" fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
                    </div>
                    
                    <p>{prod.quantity}</p>

                    <div className="prod__svg-container"
                         onClick={() => increaseProd(prod.id)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path className="button__svg" fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                    </div>
                    
                </a>
        
                <div className="prod__meta">
                    <p className="prod__category">{category}</p>
                    <p className="prod__name">{name}</p>
                    <p className="prod__price">{formatearDinero(price)}</p>
                </div>
            </div>
          )
    }
    
}

export default Product