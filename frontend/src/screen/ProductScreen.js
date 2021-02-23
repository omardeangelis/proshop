import React from "react";
import SinglePageProduct from "../components/SinglePageProduct";
import useFetch from "../custom/useFetch";
import { useParams, Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceRoundedIcon from "@material-ui/icons/KeyboardBackspaceRounded";
import styled from "styled-components";

const ProductScreen = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useFetch(`/api/products/${id}`);
  if (isLoading) {
    return <h4>...Loading</h4>;
  }
  return (
    <Wrapper>
      <div className="back-container">
        <IconButton
          component={RouterLink}
          to="/"
          edge="start"
          className="back-button"
        >
          <KeyboardBackspaceRoundedIcon className="icon-white" />
        </IconButton>
        <Typography variant="overline" component="p" color="textSecondary">
          Torna ai Prodotti
        </Typography>
      </div>
      <SinglePageProduct {...product} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  display: grid;
  justify-items: flex-start;
  gap: 3rem;
  .back-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: flex-start;
    p {
      font-size: 0.9em;
    }
    .back-button {
      background-color: var(--color-primary);
    }
  }
  @media screen and (min-width: 992px) {
    margin-top: 4rem;
    gap: 4rem;
  }
`;

export default ProductScreen;
