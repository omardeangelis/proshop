import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
const CartItem = ({
  countInStock,
  image,
  name,
  price,
  qty,
  _id,
  removeItem,
  toggleQty,
}) => {
  return (
    <Wrapper component="article">
      <div className="cart-img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <div className="cart-prd-info">
        <div className="info">
          <Typography variant="h5" className="title">
            {name}
          </Typography>
          <Typography variant="button" className="price">
            {(Number(price) * Number(qty)).toFixed(2)} €
          </Typography>
        </div>
        <div className="cart-btn-section">
          <div className="qty-selector">
            <IconButton
              color="primary"
              size="small"
              onClick={() => toggleQty(_id, "add", qty)}
            >
              <AddRoundedIcon className="btn-icon" />
            </IconButton>
            <Typography
              variant="subtitle1"
              component="p"
              className="cart-prd-qty"
            >
              {qty}
            </Typography>
            <IconButton
              color="primary"
              size="small"
              onClick={() => toggleQty(_id, "dim", qty)}
            >
              <RemoveRoundedIcon className="btn-icon" />
            </IconButton>
          </div>
          <Button
            endIcon={<RemoveCircleIcon />}
            color="secondary"
            onClick={() => removeItem(_id)}
          >
            Rimuovi
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(Paper)`
  padding: 1rem;
  gap: 1rem;
  display: grid;
  height: fit-content;
  grid-template-columns: 1fr 2fr;
  .img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
  }
  .cart-prd-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info {
      display: grid;
      gap: 0.5rem;
      .title {
        line-height: 1;
        text-transform: uppercase;
      }
      .price {
        font-size: 1.1em;
        font-weight: 700;
        color: var(--dark-grey);
      }
    }
  }
  .qty-selector {
    display: flex;
    align-items: center;
    gap: 1rem;
    .cart-prd-qty {
      font-weight: 500;
    }
  }
  .cart-btn-section {
    display: flex;
    justify-content: space-between;
  }
  @media screen and (min-width: 992px) {
    .cart-prd-qty {
      font-size: 1.3rem;
    }
  }
`;

export default CartItem;
