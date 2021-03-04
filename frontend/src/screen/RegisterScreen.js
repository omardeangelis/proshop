import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userRegister,
  newRegisterAttempt,
} from "../reducers/actions/loginActions";
import { Link as RouterLink } from "react-router-dom";
//Material UI Import
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Loading from "../components/ui/Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
}));

const LoginScreen = ({ location, history }) => {
  //Uso per rimandare utente loggato alla home
  const redirect = location.search.split("=")[1] || "/";
  const dispatch = useDispatch();
  //Global App State
  const { registerError, success, isLoading } = useSelector(
    (state) => state.register
  );
  const { isLogin } = useSelector((state) => state.login);
  //State per controllare input
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Messaggio di errore di compilazione
  const [message, setMessage] = useState("");

  //Material Ui Styled Classes
  const classes = useStyles();

  //Modifica dei valori all'interno degli input
  const handleChange = (e) => {
    if (registerError) {
      dispatch(newRegisterAttempt());
    }
    if (message) {
      setMessage("");
    }
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  //Gestisce l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputState.password === inputState.confirmPassword) {
      const cleanInput = { ...inputState };

      for (const [key, value] of Object.entries(cleanInput)) {
        if (!value) {
          delete cleanInput[key];
        }
      }

      delete cleanInput["confirmPassword"];
      dispatch(userRegister(...Object.values(cleanInput)));
    } else {
      setMessage("Password e password di conferma sono diverse");
    }
    setInputState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  //Dopo 3 secondi elimina il messaggio di errore
  useEffect(() => {
    if (registerError) {
      const timer = setTimeout(() => {
        dispatch(newRegisterAttempt());
        if (message) {
          setMessage("");
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registerError, dispatch, message]);

  //Redirect dell'User dopo il register
  useEffect(() => {
    if (isLogin && success) {
      const timer = setTimeout(() => {
        dispatch(newRegisterAttempt());
        history.push(redirect);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLogin, history, redirect, success, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrati
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
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={inputState.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Conferma Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={inputState.confirmPassword}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrati
          </Button>

          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/login">
                {"Hai già un account?"} <u>Accedi</u>
              </Link>
            </Grid>
          </Grid>
          {registerError && (
            <Alert
              variant="outlined"
              severity="error"
              className={classes.alert}
            >
              {registerError}
            </Alert>
          )}
          {success && (
            <Alert
              variant="outlined"
              severity="success"
              className={classes.alert}
            >
              {
                "Registrato! Conferma la mail per poter completare i tuoi acquisti"
              }
            </Alert>
          )}
          {message && (
            <Alert
              variant="outlined"
              severity="error"
              className={classes.alert}
            >
              {message}
            </Alert>
          )}
        </form>
      </div>
      <Loading isOpen={isLoading} />
    </Container>
  );
};

export default LoginScreen;
