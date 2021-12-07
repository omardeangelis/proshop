import React, { useRef } from "react";
import AdminBar from "../../components/ui/AdminBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardScreen from "./DashboardScreen";
import UserListScreen from "./UserListScreen";
//Material Ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
//React Redux
import { useSelector } from "react-redux";
import SingleUserScreen from "./SingleUserScreen";
import ProductListScreen from "./ProductListScreen";
import SingleProductScreen from "./SingleProductScreen";
const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "60vh",
    marginTop: theme.spacing(2),
  },
  box: {
    padding: theme.spacing(2),
  },
  userInfo: {
    marginTop: theme.spacing(5),
  },
}));

const AdminScreen = ({ match: { path }, history }) => {
  const classes = useStyles();
  const [marginFromAdminBar, setMarginFromAdminBar] = React.useState();
  const adminBarRef = useRef(null);
  const { isAdmin, isLogin } = useSelector((state) => state.login);

  React.useEffect(() => {
    if (!isLogin || !isAdmin) {
      history.push("/");
    }
    if (adminBarRef.current) {
      setMarginFromAdminBar(adminBarRef.current.getBoundingClientRect().width);
    }
  }, [history, isAdmin, isLogin]);
  return (
    <Router>
      <AdminBar refersTo={adminBarRef} />
      <Box
        style={{
          marginLeft: `${marginFromAdminBar}px`,
        }}
      >
        <h3>Admin Panel</h3>
        <Typography variant="body1" color="textSecondary">
          Pagina riservata agli admin per modificare, creare ed eliminare
          utenti, prodotti e recensioni
        </Typography>
        <Typography variant="h5" component="h2" className={classes.userInfo}>
          Ben Tornato, User
        </Typography>
        <Switch>
          <Route path={`${path}`} exact component={DashboardScreen} />
          <Paper className={classes.paper}>
            <Box className={classes.box}>
              <Route path={`${path}/users`} exact component={UserListScreen} />
              <Route
                path={`${path}/user/:id/edit`}
                exact
                component={SingleUserScreen}
              />
              <Route
                path={`${path}/products`}
                exact
                component={ProductListScreen}
              />
              <Route
                path={`${path}/product/:id/edit`}
                exact
                component={SingleProductScreen}
              />
            </Box>
          </Paper>
        </Switch>
      </Box>
    </Router>
  );
};

export default AdminScreen;
