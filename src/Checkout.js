import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    // pull item from the basket, state value hook 
    const [{ basket, user },dispatch] = useStateValue();

    return (
        <div className="checkout">
           <div className="checkout__left">
               <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt=""/>
                <div>
                    {/* Shows email address on the basket page, gives an error property of null /we add ?  */}
                    <h3>{user ? user?.email : 'Guest' } this is </h3>
                    <h2 className="checkout__title">
                        Your Shopping Basket
                    </h2>
              
              {basket.map(item => (
                  <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                />
              ))}

                </div>
           </div>

           <div className="checkout__right">
               <Subtotal />
              
           </div>
        </div>
    );
}

export default Checkout
