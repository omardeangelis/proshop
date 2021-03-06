import React, { useState } from "react";
//Material Ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
//Custom Component
import CheckoutContainer from "../components/checkout/CheckoutContainer";

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  const [shippingAddress, setShippingAddress] = useState({
    indirizzo1: "",
    indirizzo2: "",
    paese: "",
    provincia: "",
    city: "",
    cap: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("premuto");
    history.push("/paymentmethod");
    //   const isEmpty = !Object.values(prova).some((x) => x !== "" && x !== null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };
  return (
    <CheckoutContainer step={0}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Indirizzo 1"
          fullWidth
          variant="outlined"
          margin="normal"
          required
          id="indirizzo1"
          name="indirizzo1"
          value={shippingAddress.indirizzo1}
          onChange={handleChange}
        />
        <TextField
          label="Indirizzo 2"
          fullWidth
          variant="outlined"
          margin="normal"
          id="indirzzo2"
          name="indirzzo2"
          value={shippingAddress.indirzzo2}
          onChange={handleChange}
        />
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} md={6}>
            <TextField
              label="Paese"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="paese"
              name="paese"
              value={shippingAddress.paese}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Provincia"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="provincia"
              name="provincia"
              value={shippingAddress.provincia}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} md={6}>
            <TextField
              label="Città"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="city"
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="CAP"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="cap"
              name="cap"
              value={shippingAddress.cap}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
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
      </form>
    </CheckoutContainer>
  );
};

export default ShippingScreen;
