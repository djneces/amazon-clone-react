//pushing data into data layer, update basket, remove item from the basket

export const initialState = {
  basket: [],
  user: null,
};

//Selector !!! Inside the reducer. Used in production a lot
export const getBasketTotal = (basket) =>
  // reduce goes through basket and sums up the price
  //loops through the items, the price adds to the total amount, initial value 0
  //? optional chaining, avoids undefined errors
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      };

    case "REMOVE_FROM_BASKET":
      //delete only one when i click, even if its more of the same id (same book), needs to delete only 1
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBasket = [...state.basket];

      if (index >= 0) {
        //removes and chopping by 1 in that array
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in the basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
