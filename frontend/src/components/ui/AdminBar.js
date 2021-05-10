import React from "react";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import ListItemText from "@material-ui/core/ListItemText";
//React Router Dom
import { Link as RouterLink } from "react-router-dom";
// Utils
import { adminBarLink } from "../../utils/link";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  list: {
    marginTop: theme.spacing(12),
  },
  listItemText: {
    fontWeight: 800,
  },
}));
const AdminBar = ({ refersTo }) => {
  const classes = useStyles();
  return (
    <Drawer
      ref={refersTo}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={classes.drawer}
    >
      <List className={classes.list}>
        {adminBarLink.map((link) => {
          return (
            <ListItem
              component={RouterLink}
              to={`/admin/${link.text !== "dashboard" ? link.text : ""}`}
              button
              key={link.text}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText
                primary={link.text}
                primaryTypographyProps={{
                  variant: "button",
                  className: classes.listItemText,
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default AdminBar;
