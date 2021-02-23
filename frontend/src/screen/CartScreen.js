import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CartItem from "../components/CartItem";
import Typography from "@material-ui/core/Typography";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import EuroRoundedIcon from "@material-ui/icons/EuroRounded";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProductFromCart,
  toggleCartItemQty,
} from "../reducers/actions/cartActions";
import styled from "styled-components";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@material-ui/core";
const CartScreen = () => {
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const { cartItems } = useSelector((state) => state.cart);

  //Uso di Hook indiretto
  const history = useHistory();
  const dispatch = useDispatch();

  //Rimuovo Item
  const removeItem = (_id) => {
    dispatch(removeProductFromCart(_id));
  };

  //Modifio qty degli elementi nel carrello
  const addOrDimCartItemQty = (_id, type, qty) => {
    if (qty - 1 === 0 && type === "dim") {
      dispatch(removeProductFromCart(_id));
    } else {
      dispatch(toggleCartItemQty(_id, type));
    }
  };

  //Redirect Login
  const handleCheckOutClick = () => {
    history.push("/login?redirect=shipping");
  };

  //Calcolo Spese di Spedizione e Totale In maniera Dinamica
  useEffect(() => {
    setShipping(
      (
        (cartItems.reduce((total, item) => total + item.qty * item.price, 0) /
          100) *
        1.4
      ).toFixed(2)
    );

    setTotal(
      cartItems.reduce((total, item) => total + item.qty * item.price, 0)
    );
  }, [cartItems]);

  return (
    <Wrapper>
      <Typography variant="h4">Il tuo Carrello</Typography>
      <section className="cart-section">
        <div className="cart-items-section">
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
        </div>
        <div className="checkout-section">
          <Card className="checkout" color="primary">
            <CardHeader
              className="card-title"
              title="Riepilogo"
              titleTypographyProps={{ variant: "h6", align: "center" }}
            />
            <Divider />
            <CardContent className="checkout-info">
              <Paper className="paper">
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="checkout-icon">
                        <ShopTwoIcon color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Prodotti"
                      secondary={cartItems.reduce(
                        (total, item) => total + item.qty,
                        0
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="checkout-icon">
                        <EuroRoundedIcon color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Spesa Totale"
                      secondary={total.toFixed(2)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="checkout-icon">
                        <LocalShippingIcon color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Spese Di Spedizione"
                      secondary={shipping}
                    />
                  </ListItem>
                </List>
              </Paper>
              <Paper className="paper bottom-paper">
                <h4>
                  Totale: {(Number(total) + Number(shipping)).toFixed(2)} €
                </h4>
              </Paper>
            </CardContent>
            <CardActions>
              <Button
                className="checkout-btn"
                onClick={handleCheckOutClick}
                variant="contained"
                color="primary"
                endIcon={<TrendingFlatIcon />}
              >
                Checkout
              </Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  .cart-section {
    display: grid;
    gap: 1rem;
    .cart-items-section {
      display: grid;
      gap: 1rem;
    }
  }
  @media screen and (min-width: 992px) {
    .cart-section {
      grid-template-columns: 2fr 1fr;
    }
  }
  .checkout-section {
    display: flex;
    .checkout {
      padding: 1rem;
      width: 100%;
      height: fit-content;
      .card-title {
        width: 100%;
      }
      hr {
        width: 100%;
      }
      .checkout-info {
        display: grid;
        gap: 1rem;
        .bottom-paper {
          padding: 1rem;
          text-transform: uppercase;
        }
        .paper {
          width: 95%;
          margin: auto;
          .checkout-icon {
            background-color: transparent;
          }
        }
      }
      .checkout-btn {
        width: 90% !important;
        margin: auto;
        border-radius: var(--btn-radius);
      }
    }
  }
`;

export default CartScreen;
