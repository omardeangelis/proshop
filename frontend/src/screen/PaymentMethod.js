import React, { useState } from "react";
//Custom Component
import CheckoutContainer from "../components/checkout/CheckoutContainer";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
//React Router
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "grid",
    gap: theme.spacing(2),
  },
  btnSection: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
  buttons: {
    display: "flex",
    gap: theme.spacing(5),
  },
}));
const PaymentMethodScreen = ({ history }) => {
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const handleRadioChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    // history.push("/placeorder");
  };

  return (
    <CheckoutContainer step={1}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormLabel>Scegli un metodo di pagamento</FormLabel>
        <FormControl required>
          <RadioGroup
            value={paymentMethod}
            onChange={handleRadioChange}
            name="paymentmethod"
          >
            <FormControlLabel
              control={<Radio color="primary" />}
              label="PayPal"
              value="PayPal"
            ></FormControlLabel>
            <FormControlLabel
              control={<Radio color="primary" />}
              label="Stripe"
              value="Stripe"
            ></FormControlLabel>
          </RadioGroup>
        </FormControl>
        <div className={classes.btnSection}>
          <div className={classes.buttons}>
            <Button variant="text" component={RouterLink} to="/shipping">
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn"
              component={Link}
              href={"/placeorder"}
            >
              conferma
            </Button>
          </div>
        </div>
      </form>
    </CheckoutContainer>
  );
};

export default PaymentMethodScreen;
