import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { Box, Icon } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";

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
  menu: {},
  menuItemIcon: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const { cartItems } = useSelector((state) => state.cart);
  const { isLogin, isAdmin } = useSelector((state) => state.login);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <Badge
                  badgeContent={cartItems.length}
                  color="secondary"
                  className={classes.menuIcon}
                >
                  <ShoppingCartIcon />
                </Badge>{" "}
                Cart
              </Button>
              {!isLogin ? (
                <Button color="inherit" component={RouterLink} to="/login">
                  <Icon className={classes.menuIcon}>
                    <PersonIcon />
                  </Icon>
                  Login
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    User
                    <Icon className={classes.menuIcon}>
                      <ArrowDropDownIcon />
                    </Icon>
                  </Button>
                  <Menu
                    className={classes.menu}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      className={classes.menu}
                      onClick={handleClose}
                      component={RouterLink}
                      to="/profile"
                    >
                      <Icon className={classes.menuItemIcon}>
                        <PersonIcon />
                      </Icon>
                      Profile
                    </MenuItem>
                    {isAdmin && (
                      <MenuItem
                        className={classes.menu}
                        onClick={handleClose}
                        component={RouterLink}
                        to="/admin"
                      >
                        <Icon className={classes.menuItemIcon}>
                          <SupervisorAccountIcon />
                        </Icon>
                        Admin
                      </MenuItem>
                    )}
                    <MenuItem
                      className={classes.menu}
                      onClick={handleClose}
                      component={RouterLink}
                      to="/logout"
                    >
                      <Icon className={classes.menuItemIcon}>
                        <ExitToAppIcon />
                      </Icon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
