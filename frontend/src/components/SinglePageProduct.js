import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Rating from "../components/Rating";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

//Redux Import
import { useDispatch } from "react-redux";
import { addProductToCart } from "../reducers/actions/cartActions";

const SinglePageProduct = ({
  _id,
  brand,
  countInStock,
  description,
  category,
  image,
  name,
  numReviews,
  price,
  rating,
}) => {
  const history = useHistory();
  const [qty, setQty] = useState(1);

  const aumentaQty = () => {
    setQty((prevState) =>
      prevState + 1 > countInStock ? prevState : prevState + 1
    );
  };

  const diminuisciQty = () => {
    setQty((prevState) => (prevState - 1 === 0 ? prevState : prevState - 1));
  };

  //Redux Global State Modify
  const dispatch = useDispatch();
  const addItemToCart = (_id, qty) => {
    dispatch(addProductToCart(_id, qty));
    history.push(`/cart/${_id}`);
  };

  return (
    <Wrapper className="single-product">
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <div className="info-container">
        <Typography variant="h6" component="h2">
          {name}
        </Typography>
        <Typography variant="overline" component="p">
          {description}
        </Typography>
        <Divider />
        <div className="action">
          <Rating value={rating} text={numReviews} />
          <Typography variant="h6" component="h3">
            {price} €
          </Typography>
          <div className="product-action product-action-query">
            {countInStock > 0 && (
              <div className="qty-selector">
                <IconButton color="primary" size="small" onClick={aumentaQty}>
                  <AddRoundedIcon />
                </IconButton>
                <Typography variant="h6" component="h3">
                  {qty}
                </Typography>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={diminuisciQty}
                >
                  <RemoveRoundedIcon />
                </IconButton>
              </div>
            )}
            <Button
              color="primary"
              variant="contained"
              className="btn"
              onClick={() => addItemToCart(_id, qty)}
              disabled={!countInStock}
            >
              {countInStock > 0 ? "Aggiungi" : "Terminato"}
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .img {
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: var(--light-shadow);
  }
  .product-action {
    width: 100%;
    display: grid;
    gap: 2rem;
  }
  .qty-selector {
    display: flex;
    gap: 2rem;
  }
  .btn {
    border-radius: var(--btn-radius);
  }
`;

export default SinglePageProduct;
