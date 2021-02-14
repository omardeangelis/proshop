import React from "react";
import styled from "styled-components";
import Rating from "../components/Rating";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
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
        <Rating value={rating} text={numReviews} />
        <Typography variant="h6" component="h2">
          {price} €
        </Typography>
        <Button
          color="primary"
          variant="contained"
          className="btn"
          disabled={!countInStock}
        >
          {countInStock > 0 ? "Aggiungi" : "Terminato"}
        </Button>
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
  .btn {
    border-radius: var(--btn-radius);
    @media screen and (min-width: 992px) {
      width: 40%;
    }
  }
`;

export default SinglePageProduct;
