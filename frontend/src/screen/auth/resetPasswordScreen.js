import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/ui/Loading";
//Material UI
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { resetUserPassword } from "../../reducers/actions/validationActions";

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

const ResetPasswordScreen = () => {
  const { token } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, success, error } = useSelector(
    (state) => state.resetPassword
  );
  const [input, setIpnut] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [type, setType] = useState({
    firstInput: false,
    secondInput: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIpnut({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.newPassword === input.confirmPassword) {
      dispatch(resetUserPassword(input.newPassword, token));
      setIpnut({
        newPassword: "",
        confirmPassword: "",
      });
      setMessage("");
    } else {
      setMessage("Le password inserite non sono uguali");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Imposta Nuova Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            type={type.firstInput ? "text" : "password"}
            required
            fullWidth
            id="newPassword"
            label="Inserisci la nuova password"
            name="newPassword"
            autoComplete="current-password"
            value={input.newPassword}
            onChange={handleChange}
            autoFocus
            end
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type={type.secondInput ? "text" : "password"}
            id="confirmPassword"
            label="conferma la nuova password"
            name="confirmPassword"
            autoComplete="current-password"
            value={input.confirmPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} btn`}
          >
            Cambia Password
          </Button>
          {error && (
            <Alert
              variant="outlined"
              severity="error"
              className={classes.alert}
            >
              {error}
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
          {success && (
            <Alert
              variant="outlined"
              severity="success"
              className={classes.alert}
            >
              Password Modificata
            </Alert>
          )}
        </form>
      </div>
      <Loading isOpen={isLoading} />
    </Container>
  );
};

export default ResetPasswordScreen;
