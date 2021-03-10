import React, { useState, useEffect } from "react";
//React Redux
import { useSelector, useDispatch } from "react-redux";
//React Router
import { Link as RouterLink } from "react-router-dom";
//Styled Components
import styled from "styled-components";
//Custom Component
import AccordionContainer from "../components/ui/Accordion";
import ShippingAddressForm from "../components/userProfile/ShippingAddress";
//Material UI
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
//Actions
import {
  fetchProfileData,
  resetUserProfileInfo,
  updateProfile,
  profileUpdateSuccess,
  updatePassword,
  passwordUpdateSuccess,
} from "../reducers/actions/loginActions";

import { shippingUpdateSuccess } from "../reducers/actions/shippingActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  infoAlert: {
    border: "1px solid var(--blue-200)",
  },
}));

const UserProfileScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  //Update Profile Info di Base
  const { error, success: infoSuccessUpdate } = useSelector(
    (state) => state.updateProfile
  );

  //Update profile password
  const { error: passwordUpdateError, success } = useSelector(
    (state) => state.updatePassword
  );

  //Update ShippingAddress
  const { success: shippingSuccess } = useSelector(
    (state) => state.updateShippingAddress
  );

  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
    nuovaPassword: "",
  });

  //State da utilizzare in caso di cambio password corretto
  const [changeOpenState, setChangeOpenState] = useState("");

  //Controlla submit del form per le info
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(inputState.name, inputState.email));
  };

  //Gestisce il submit del cambio password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(inputState.nuovaPassword, inputState.password));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  //Fetcha dati del profilo
  useEffect(() => {
    if (
      user === null ||
      user === undefined ||
      (Object.keys(user).length === 0 && user.constructor === Object)
    ) {
      dispatch(fetchProfileData());
    } else {
      setInputState({
        ...inputState,
        name: user.name,
        email: user.email,
      });
      return () => dispatch(resetUserProfileInfo());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  //Chiusura accordion quando modifica è di successo
  useEffect(() => {
    //Chiudo panel per aggiornamento info
    if (success) {
      setInputState({ ...inputState, password: "", nuovaPassword: "" });
      setChangeOpenState("passwordPanel");
      const successTimer = setTimeout(() => {
        dispatch(passwordUpdateSuccess());
        setChangeOpenState("");
      }, 3000);
      return () => {
        clearTimeout(successTimer);
      };
    }
    //Chiudo panel per aggiornamento password
    if (infoSuccessUpdate) {
      setChangeOpenState("infoPanel");
      const successTimer = setTimeout(() => {
        dispatch(profileUpdateSuccess());
        setChangeOpenState("");
      }, 3000);
      return () => {
        clearTimeout(successTimer);
      };
    }
    //Chiudo Panel aggiornamento indirizzo di spedizione
    if (shippingSuccess) {
      setChangeOpenState("shippingPanel");
      const successTimer = setTimeout(() => {
        dispatch(shippingUpdateSuccess());
        setChangeOpenState("");
      }, 3000);
      return () => {
        clearTimeout(successTimer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, infoSuccessUpdate, dispatch, shippingSuccess]);
  return (
    <Wrapper>
      <Typography variant="h4">Il TUO PROFILO</Typography>
      <div className="user-update-container">
        <div className="user-info">
          <AccordionContainer
            changeOpenState={changeOpenState === "infoPanel"}
            title="User Info"
            description={`${
              infoSuccessUpdate
                ? "informazioni modificate"
                : "Modifica nome e email"
            }`}
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Profilo
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Il Tuo Nome"
                  name="name"
                  value={inputState.name}
                  onChange={handleChange}
                  autoComplete="name"
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={inputState.email}
                  onChange={handleChange}
                />
                {error && (
                  <Alert
                    variant="outlined"
                    severity="error"
                    className={classes.alert}
                  >
                    {error}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={`${classes.submit} btn`}
                >
                  Modifica
                </Button>
              </form>
            </div>
          </AccordionContainer>

          {/* Modifica Password From */}

          <AccordionContainer
            changeOpenState={changeOpenState === "passwordPanel"}
            title="Password"
            description={`${
              success ? "password modificata" : "Cambia la tua password"
            }`}
            onClick={() => setChangeOpenState(false)}
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Password
              </Typography>
              <form className={classes.form} onSubmit={handlePasswordSubmit}>
                <TextField
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Nuova Password"
                  name="password"
                  value={inputState.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <TextField
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nuovaPassword"
                  label="Password Precedente"
                  name="nuovaPassword"
                  autoComplete="nuovaPassword"
                  value={inputState.nuovaPassword}
                  onChange={handleChange}
                />
                {passwordUpdateError && (
                  <Alert
                    variant="outlined"
                    severity="error"
                    className={classes.alert}
                  >
                    {passwordUpdateError}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={`${classes.submit} btn`}
                >
                  Modifica
                </Button>
              </form>
            </div>
          </AccordionContainer>

          {/* Crea  Indirizzo di Spedizione*/}
          <AccordionContainer
            title="Indirizzo di Spedizione"
            description="Modifica indirizzo di spedizione"
            changeOpenState={changeOpenState === "shippingPanel"}
            onClick={() => setChangeOpenState(false)}
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LocalShippingIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Indirizzo di Consegna
              </Typography>
              <ShippingAddressForm />
            </div>
          </AccordionContainer>
          {user && !user.isActive && (
            <Alert severity="info" className={classes.infoAlert}>
              <AlertTitle>Attiva il tuo profilo</AlertTitle>
              Per completare i pagamenti conferma il tuo account{" "}
              <RouterLink to="/activeuser">
                {" "}
                <strong>
                  <u>premendo qui</u>
                </strong>
              </RouterLink>
            </Alert>
          )}
        </div>
        <div className="user-actions">b</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  .user-update-container {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: 4rem;
  }
  .user-info {
    display: grid;
    gap: 2rem;
  }
`;

export default UserProfileScreen;
