import { useEffect, useState } from 'react'
import './App.css'
import Cart from './components/Cart'
import Product from './components/Product'
import Modal from './components/Modal'
/* eslint-disable react/prop-types */
function App() {

  /*Al iniiciar reviso el Storage para saber si ya hay un carrito previo
    si ya existe le asigno el valor del carrito previo al carrito
  */
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");

    return localStorageCart? JSON.parse(localStorageCart) : [];
  }
  
  const [db, setdb] = useState([])
  const [cart, setCart] = useState(initialCart)
  const [modal, setmodal] = useState(false)

  /* Consulto la base de datos cuando el componente esta listo*/
  useEffect(() => {

    fetch("./../../data.json")
    .then(respuesta => respuesta.json())
    .then(resultado => {
      setdb(resultado)
    })

  }, [])

  /* Cada vez que cart cambie se guardara en el local storage */
  useEffect(() =>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])
  
  /* Funcion que agrega un elemento a el carrito */
  function addToCart(prod){
    const prodExiste = cart.findIndex(cart => cart.id === prod.id);

    if(prodExiste < 0){
      prod.quantity = 1;
      setCart([...cart, prod])
    } 
    else{
      
      const updatedCart = [...cart];
      updatedCart[prodExiste].quantity++;

      setCart(updatedCart);
    }
  }
  /* Funcion que elmina un elemento del cart */
  function removeElement(id) {
    const lastCart = [...cart];
    lastCart.forEach(prod => {
      if(prod.id === id){
        prod.quantity = 0;
      }
    })
    
    const updatedCart = lastCart.filter(prod => prod.id !== id)

    setCart(updatedCart);

  }

  /* Funciones que modifican la cantidad de un producto */

  function increaseProd(id){
    const lastCard = [...cart];
    lastCard.forEach(prod => {
      if(prod.id === id && prod.quantity < 10){
        prod.quantity++;
      }
    })
    setCart(lastCard);

    revisaZero()
  }
  function decreaseProd(id){
    const lastCard = [...cart];
    lastCard.forEach(prod => {
      if(prod.id === id && prod.quantity > 0){
        prod.quantity--;
      }
    })
    setCart(lastCard);
    revisaZero()
  }

  /* Revisa si algun elemento en el carrito tiene cantidad de 0 y lo elimina */
  function revisaZero(){
    const lastCard = [...cart];
    const updatedCart = lastCard.filter(prod => prod.quantity !== 0);

    setCart(updatedCart)
  }
  /* Funcion que reinicia las cantidades de todos los productos en 0 */
  function reiniciaQuantitys (){
    const updatedCart = [...cart];

    updatedCart.forEach(prod => {
      prod.quantity = 0;
    })
  }

  return (
    

    <div className="container">
      {modal? (
        <Modal
          setmodal={setmodal}
          cart = {cart}
          setCart= {setCart}
          reiniciaQuantitys= {reiniciaQuantitys}
        />
      ): null}

      <Cart
        cart = {cart}
        removeElement={removeElement}
        revisaZero={revisaZero}
        setmodal= {setmodal}
      />

      <main className='products'>
        <h1 className='products__heading'>Desserts</h1>

        <div className="products__grid">
            {db.map(prod => (
              <Product
                key={prod.id}
                prod = {prod}
                addToCart={addToCart}
                increaseProd = {increaseProd}
                decreaseProd = {decreaseProd}
                cart = {cart}
              />
            ))}
        </div>
      </main>
    </div>
  )
}

export default App
