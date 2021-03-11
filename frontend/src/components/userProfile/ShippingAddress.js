import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import {
  getUserShippingAddress,
  updateUserShippingAddress,
} from "../../reducers/actions/shippingActions";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ShippingAddress = ({ children, customHandleSubmit }) => {
  const classes = useStyles();
  const { shipping } = useSelector((state) => state.getShippingAddress);
  const { error, success } = useSelector(
    (state) => state.updateShippingAddress
  );

  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    indirizzo1: "",
    indirizzo2: "",
    city: "",
    paese: "",
    cap: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    delete inputState["_id"];
    dispatch(updateUserShippingAddress(inputState));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const shippingHandleSubmit = (e) => {
    e.preventDefault();
    customHandleSubmit(inputState);
  };

  useEffect(() => {
    if (
      shipping === null ||
      shipping === undefined ||
      (Object.keys(shipping).length === 0 && shipping.constructor === Object)
    ) {
      dispatch(getUserShippingAddress());
    } else {
      setInputState({ ...shipping });
    }
  }, [shipping, dispatch]);
  return (
    <form
      className={classes.form}
      onSubmit={customHandleSubmit ? shippingHandleSubmit : handleSubmit}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="indirizzo1"
        label="Il tuo Indirizzo Principale"
        name="indirizzo1"
        value={inputState.indirizzo1}
        onChange={handleChange}
        autoComplete="address"
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="indirizzo2"
        label="Il tuo Indirizzo Secondario"
        name="indirizzo2"
        value={inputState.indirizzo2}
        onChange={handleChange}
        autoComplete="address"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="city"
        label="La tua Città"
        name="city"
        autoComplete="city"
        value={inputState.city}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="paese"
        label="Paese o Stato"
        name="paese"
        autoComplete="country"
        value={inputState.paese}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="cap"
        label="CAP"
        name="cap"
        autoComplete="zip-code"
        value={inputState.cap}
        onChange={handleChange}
      />
      {error && (
        <Alert variant="outlined" severity="error" className={classes.alert}>
          {error}
        </Alert>
      )}
      {children ? (
        children
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={`${classes.submit} btn`}
        >
          Modifica
        </Button>
      )}
    </form>
  );
};

export default ShippingAddress;
