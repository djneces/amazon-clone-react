import React from "react";
import "./Header.css";
// import search icon
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
//pull the information, deconstruct state => basket, user, we use only basket, we dont use dispatch here 
const [{ basket, user }, dispatch] = useStateValue();

const handleAuthentication = () => {
  if (user) {
    //pokud user prihlaseny, tohle odhlasi 
    auth.signOut();
  }
}

  return (
    <div className="header">
      {/* import link which goes to the main page  */}
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        {/* only if no user logged in, redirects to the login page !!!! no refresh !!!! */}
        <Link to={!user && "/login"}>
        <div onClick={handleAuthentication} className="header__option">
          <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
          {/* if the user is present - sign out, otherwise sign in  */}
          <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
        </div>
        </Link>

        <Link to="/orders">
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo"> & Orders</span>
        </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            {/* ? handels error when the value is somewhat wrong  */}
            <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
