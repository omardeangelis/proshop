import React from "react";
import Rating from "../components/Rating";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
const Product = ({ _id, name, image, rating, price, numReviews }) => {
  return (
    <Wrapper>
      <RouterLink to={`product/${_id}`}>
        <img src={`${image}`} alt={name} className="img" />
        <CardContent className="card-content">
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            className="title"
          >
            {name}
          </Typography>
          <Typography variant="h6" component="p">
            <strong>{price} €</strong>
          </Typography>
          <Rating value={rating} text={numReviews} />
        </CardContent>
      </RouterLink>
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  transition: var(--transition);
  .card-content {
    display: grid;
    gap: 0.5rem;
    padding: auto;
  }
  .title {
    line-height: 1.4;
  }
  .img {
    margin: auto;
    width: 100%;
    height: auto;
  }
  &:hover {
    background-color: var(--color-primary);
    color: var(--bg-color);
    transform: scale(1.01);
  }
`;

export default Product;
