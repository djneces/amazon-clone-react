import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios"; 
import {db} from "./firebase";

function Payment() {
  // pull data from the data layer
  const [{ basket, user }, dispatch] = useStateValue();
  
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  //2 states processing and succeeded
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  //  2 states error and disable
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  //client secret what i get from stripes once i submit amount
  const [clientSecret, setClientSecret] = useState(true);

  //runs when payment component loads or when any of the variables inside the brackets change
//whenever the basket changes it will make this request and it will update the stripe special secret what allow us to charge the customer
  useEffect(() => {
    //generate the special stripe secret which allow us to charge a customer to
    const getClientSecret = async () => {
        const response = await axios({
            method: 'post',
            //Stripe expects the total in a currencies subunits / *100
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`
        });
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
  }, [basket])

  console.log('The secret is *** ', clientSecret);

  const handleSubmit = async (event) => {
      event.preventDefault(); 
    //   let me click once, then it disables the button, so I cant click various times 
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation

            //push into the DB
            db
            .collection('users')  //collection users
            .doc(user?.uid)  //user
            .collection('orders') //that user orders
            .doc(paymentIntent.id)
            .set({ //add this info into DB
                basket: basket,  //items
                amount: paymentIntent.amount, //amount
                created: paymentIntent.created //timestamp
            })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            //after payment redirects, so user cant go back, no history.push
            history.replace('/orders');

             //after payment process, clear the basket 
             dispatch({
                type: 'EMPTY_BASKET'
            })
        })
  };

  const handleChange = (event) => {
    //listen for changes in the cardelements
    //display any errors as the customer types their card payment__details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link to="/checkout">
            {basket?.length} {basket?.length === 1 ? "item" : "items"}
          </Link>
          )
        </h1>

        {/* delivery address  */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            {/* ? if its undefined  */}
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA, USA</p>
          </div>
        </div>
        {/* review items  */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
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
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  //   render prop = value parsed in from getBasketTotal
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                {/* if its processing say processing and its disabled at the same time  */}
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors  , if errors, show them*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
