import React, { useEffect } from "react";
//Custom Ui
import Loading from "../../components/ui/Loading";
//Router Dom
import { useParams } from "react-router-dom";
//Material Ui
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import Container from "@material-ui/core/Container/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
// ACTION
import {
  getSingleUserByAdmin,
  updateUserDetailByAdmin,
  resetUserUpdateByAdminState,
} from "../../reducers/actions/adminActions";
//React Redux
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),

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

const SingleUserScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //userListStae
  const { isLoading, singleUser, error } = useSelector(
    (state) => state.getUserList
  );
  //updateUserState
  const { isLoading: updateLoading, success, error: updateError } = useSelector(
    (state) => state.updateUser
  );
  //Local State
  const [checked, setChecked] = React.useState(false);
  const [inputState, setInputState] = React.useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    if (updateError) {
      resetUserUpdateByAdminState("error");
    }
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserDetailByAdmin(id, { ...inputState, isAdmin: checked }));
  };

  const id = useParams().id;
  console.log(singleUser);

  useEffect(() => {
    if (!singleUser || success) {
      dispatch(getSingleUserByAdmin(id));
    } else {
      setInputState({
        name: singleUser.name,
        email: singleUser.email,
      });
      setChecked(singleUser.isAdmin);
    }
    return () => dispatch(resetUserUpdateByAdminState("success"));
  }, [singleUser, dispatch, id, success]);

  useEffect(() => {
    if (updateError) {
      const timer = setTimeout(() => {
        dispatch(resetUserUpdateByAdminState("error"));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updateError, dispatch]);

  if (isLoading || updateLoading) {
    return <Loading isOpen={isLoading} />;
  }
  return (
    <Container maxWidth="xs" className={classes.paper}>
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
          label="Nome Utente"
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
          label="User Mail"
          name="email"
          autoComplete="email"
          value={inputState.email}
          onChange={handleChange}
        />
        <FormControlLabel
          label="Imposta come Admin"
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              color="primary"
            />
          }
        />
        {(error || updateError) && (
          <Alert variant="outlined" severity="error" className={classes.alert}>
            {error ? error : updateError && updateError}
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
    </Container>
  );
};

export default SingleUserScreen;
