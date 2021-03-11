import React, { useState } from "react";
//Material Ui
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//Custom Component
import CheckoutContainer from "../components/checkout/CheckoutContainer";
import ShippingAddressForm from "../components/userProfile/ShippingAddress";
//React-Redux
import { createShippingAddress } from "../reducers/actions/shippingActions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const handleSubmit = (input) => {
    if (checked) {
      dispatch(createShippingAddress(input));
    } else {
      localStorage.setItem("shippingAddress", JSON.stringify(input));
    }
    history.push("/paymentmethod");
    //   const isEmpty = !Object.values(prova).some((x) => x !== "" && x !== null);
  };

  return (
    <CheckoutContainer step={0}>
      <ShippingAddressForm customHandleSubmit={handleSubmit}>
        <footer className={classes.footer}>
          <FormControlLabel
            label="Salva Indirizzo"
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                color="primary"
              />
            }
          />
          <div className={classes.btnSection}>
            <div className={classes.buttons}>
              <Button variant="text" disabled className="btn">
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="btn"
              >
                conferma
              </Button>
            </div>
          </div>
        </footer>
      </ShippingAddressForm>
    </CheckoutContainer>
  );
};

export default ShippingScreen;
