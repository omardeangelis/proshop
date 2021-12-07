import React from "react";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { indigo } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    color: indigo[400],
    fontWeight: 800,
    textTransform: "lowercase",
    fontVariant: "small-caps",
  },
  description: {
    maxWidth: "75ch",
  },
}));

const AdminPaperTitle = ({ title, description }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" component="h2" className={classes.title}>
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        className={classes.description}
      >
        {description}
      </Typography>
    </>
  );
};

export default AdminPaperTitle;
