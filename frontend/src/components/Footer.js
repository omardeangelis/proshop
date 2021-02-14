import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Wrapper>
          <Typography variant="button">Copyrights &copy; of ProShop</Typography>
        </Wrapper>
      </Container>
    </footer>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

export default Footer;
