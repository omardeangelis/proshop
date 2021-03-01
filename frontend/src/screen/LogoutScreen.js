import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { userLogout } from "../reducers/actions/loginActions";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyle = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  paper: {
    padding: "3rem",
    display: "grid",
    placeItems: "center",
    gap: "1rem",
  },
});
const LogoutScreen = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.login);
  const classes = useStyle();

  useEffect(() => {
    dispatch(userLogout());
  }, [dispatch]);
  if (isLogin) {
    return (
      <Typography variant="h4" align="center">
        Loading....
      </Typography>
    );
  }
  return (
    <Container maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h3" align="center">
          Disconnesso
        </Typography>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className="btn"
          component={RouterLink}
          to="/"
        >
          Back Home
        </Button>
      </Paper>
    </Container>
  );
};

export default LogoutScreen;
