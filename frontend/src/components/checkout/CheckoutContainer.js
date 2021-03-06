import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const steps = [
  "indirizzo di spedizione",
  "metodo di pagamento",
  "conferma ordine",
];

const useStyles = makeStyles((theme) => ({
  stepper: {
    backgroundColor: "transparent",
  },
}));

const CheckoutContainer = ({ children, step }) => {
  const classes = useStyles();
  return (
    <Wrapper maxWidth="md">
      <Typography align="center" variant="h4">
        Checkout
      </Typography>
      <Stepper className={classes.stepper} activeStep={step}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="content">{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin-top: 4rem;
  display: grid;
  box-shadow: var(--light-shadow);
  background-color: #ffffff;
  padding: 2rem 0;
  border-radius: var(--radius);
  .content {
    display: grid;
    gap: 1rem;
    width: 90%;
    justify-self: center;
  }
  .button-section {
    display: flex;
    justify-content: flex-end;
    .buttons {
      display: flex;
      gap: 0.8rem;
    }
  }
`;

export default CheckoutContainer;
