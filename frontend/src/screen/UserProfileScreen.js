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
  updatePassword,
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
  const { error } = useSelector((state) => state.updateProfile);

  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
    nuovaPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(inputState.name, inputState.email));
  };

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

  useEffect(() => {
    if (
      user === null ||
      user === undefined ||
      (Object.keys(user).length === 0 && user.constructor === Object)
    ) {
      dispatch(fetchProfileData());
    } else {
      setInputState({
        name: user.name,
        email: user.email,
      });
      return () => dispatch(resetUserProfileInfo());
    }
  }, [dispatch, user]);

  return (
    <Wrapper>
      <Typography variant="h4">Il TUO PROFILO</Typography>
      <div className="user-update-container">
        <div className="user-info">
          <AccordionContainer
            title="User Info"
            description="Modifica nome ed email"
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
            title="Password"
            description="Cambia la tua password"
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
