import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
//Material UI Import
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
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
    backgroundColor: theme.palette.primary.main,
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

const ResetPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ripristina Password
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
            value={email}
            onChange={handleChange}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} btn`}
          >
            Ripristina password
          </Button>

          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/login" variant="body2">
                <u>Accedi</u>
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/register">
                {"Nuovo Utente?"} <u>Registrati</u>
              </Link>
            </Grid>
          </Grid>
          {/* {error && (
              <Alert
                variant="outlined"
                severity="error"
                className={classes.alert}
              >
                {error}
              </Alert>
            )} */}
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
