import React from "react";
import CartItem from "../components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProductFromCart,
  toggleCartItemQty,
} from "../reducers/actions/cartActions";
import styled from "styled-components";
const CartScreen = () => {
  const dispatch = useDispatch();

  //Rimuovo Item
  const removeItem = (_id) => {
    dispatch(removeProductFromCart(_id));
  };

  const addOrDimCartItemQty = (_id, type, qty) => {
    if (qty - 1 === 0 && type === "dim") {
      dispatch(removeProductFromCart(_id));
    } else {
      dispatch(toggleCartItemQty(_id, type));
    }
  };

  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Wrapper>
      <section className="cart-section">
        {cartItems.length > 0 ? (
          cartItems.map((el) => (
            <CartItem
              key={el._id}
              {...el}
              removeItem={removeItem}
              toggleQty={addOrDimCartItemQty}
            />
          ))
        ) : (
          <h4>Aggiungi prodotti al carrello</h4>
        )}
      </section>
      <section>
        <div>aaaa</div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 1rem;
  .cart-section {
    display: grid;
    gap: 1rem;
  }
  @media screen and (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export default CartScreen;
