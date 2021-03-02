import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccordionContainer from "../components/ui/Accordion";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchProfileData,
  resetUserProfileInfo,
  updateProfile,
  profileUpdateSuccess,
  updatePassword,
  passwordUpdateSuccess,
} from "../reducers/actions/loginActions";

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
}));

const UserProfileScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { error, success: infoSuccessUpdate } = useSelector(
    (state) => state.updateProfile
  );
  const { error: passwordUpdateError, success } = useSelector(
    (state) => state.updatePassword
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
    // if (registerError) {
    //   dispatch(newRegisterAttempt());
    // }
    // if (message) {
    //   setMessage("");
    // }
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

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, infoSuccessUpdate, dispatch]);
  return (
    <Wrapper>
      <Typography variant="h4">Il TUO PROFILO</Typography>
      <div className="user-update-container">
        <div className="user-info">
          <AccordionContainer
            isDefaultOpen
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
`;

export default UserProfileScreen;
