import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import { Box, Icon } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    padding: "1rem 0rem",
  },
  toolBar: {
    padding: "0",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuIcon: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <header>
      <AppBar position="static" color="primary" className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolBar}>
            <div className="menu-button">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Typography
              variant="h5"
              className={classes.title}
              component={RouterLink}
              to="/"
            >
              ProShop
            </Typography>
            <Box className="box-link">
              <Button color="inherit" component={RouterLink} to="/cart">
                {" "}
                <Icon className={classes.menuIcon}>
                  <ShoppingCartIcon />
                </Icon>{" "}
                Cart
              </Button>
              <Button color="inherit" component={RouterLink} to="/login">
                <Icon className={classes.menuIcon}>
                  <PersonIcon />
                </Icon>
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
