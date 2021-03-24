import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product 
          id="12321341"
          title='The lean startup: How Constant Innovation Creates Radically Successful Businesses Paperback' 
          price={29.99} 
          image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" 
          rating={5}
          />

          <Product 
          id="49538094"
          title='Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl' 
          price={239.00} 
          image="https://images-na.ssl-images-amazon.com/images/I/61%2BfrTbCBhL._AC_SL1001_.jpg" 
          rating={4}
          />

         
        </div>

        <div className="home__row">
        <Product 
          id="4903850"
          title='Letsfit Smart Watch, Fitness Tracker with Heart Rate Monitor, Activity Tracker with 1.3 Inch Touch Screen' 
          price={29.99} 
          image="https://images-na.ssl-images-amazon.com/images/I/615LDnvQApL._AC_SL1500_.jpg" 
          rating={4}
          />

        <Product 
          id="23445930"
          title='Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal' 
          price={98.99} 
          image="https://images-na.ssl-images-amazon.com/images/I/6182S7MYC2L._AC_SL1000_.jpg" 
          rating={5}
          />

        <Product 
          id="3254354345"
          title='New Apple iPad Pro (12.9-inch, Wi-Fi, 256GB) - Space Gray (4th Generation)' 
          price={598.99} 
          image="https://images-na.ssl-images-amazon.com/images/I/81SGb5l%2BlZL._AC_SL1500_.jpg" 
          rating={4}
          />
        </div>

        <div className="home__row">
        <Product 
          id="90829332"
          title='Samsung LC49RG90SSUXEN 49 Curved LED Gaming Monitor' 
          price={1094.98} 
          image="https://images-na.ssl-images-amazon.com/images/I/71916r38cNL._AC_SL1500_.jpg" 
          rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
