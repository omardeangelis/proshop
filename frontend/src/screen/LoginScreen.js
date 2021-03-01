import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  tryLoginUser,
  newLoginAttempt,
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
  const { isLogin, error, isLoading } = useSelector((state) => state.login);

  //State per controllare input
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Material Ui Styled Classes
  const classes = useStyles();

  //Modifica dei valori all'interno degli input
  const handleChange = (e) => {
    if (error) {
      dispatch(newLoginAttempt());
    }
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  //Gestisce l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = { ...inputState };

    for (const [key, value] of Object.entries(cleanInput)) {
      if (!value) {
        delete cleanInput[key];
      }
    }

    setInputState({
      email: "",
      password: "",
    });

    dispatch(tryLoginUser(...Object.values(cleanInput)));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(newLoginAttempt());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isLogin) {
      history.push(redirect);
    }
  }, [isLogin, history, redirect]);

  if (isLoading) {
    return (
      <Typography variant="h4" align="center">
        Loading....
      </Typography>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Accedi
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
            Accedi
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={RouterLink}
                href="#"
                variant="body2"
                to="/register"
              >
                {"Nuovo Utente?"} <u>Registrati</u>
              </Link>
            </Grid>
          </Grid>
          {error && (
            <Alert
              variant="outlined"
              severity="error"
              className={classes.alert}
            >
              {error}
            </Alert>
          )}
        </form>
      </div>
    </Container>
  );
};

export default LoginScreen;
