import React, { useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  success: {
    backgroundColor: "var(--green-a-100)",
  },
  accordionDetails: {
    display: "block",
  },
}));

const AccordionContainer = ({
  title,
  description,
  children,
  isDefaultOpen,
  changeOpenState,
}) => {
  const classes = useStyles();
  const [isExpand, setIsExpand] = React.useState(isDefaultOpen || false);

  useEffect(() => {
    if (changeOpenState) {
      setIsExpand(false);
    }
  }, [changeOpenState]);
  return (
    <Accordion expanded={isExpand}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={`${changeOpenState ? classes.success : ""}`}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        onClick={() => setIsExpand(!isExpand)}
      >
        <Box>
          <Box className={classes.heading}> {title}</Box>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionContainer;
