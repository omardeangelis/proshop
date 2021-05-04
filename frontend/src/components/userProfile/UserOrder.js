import React from "react";
// Custom Component
import AccordionContainer from "../ui/Accordion";
// Router
import { Link as RouterLink } from "react-router-dom";
// Material Ui
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
//clsx
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gap: "2rem",
  },
  list: {
    listStyle: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  title: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    alignItems: "center",
    gap: "2rem",
  },
  titleSpan: {
    borderRadius: "var(--radius)",
    fontVariant: "small-caps",
    textTransform: "lowercase",
    fontSize: "0.80em",
    fontWeight: 600,
    letterSpacing: "0.1rem",
    padding: "0rem 0.25rem",
    border: "1px solid",
  },
  paidSpan: {
    background: green[50],
    borderColor: green[500],
    color: green[500],
  },
  unPaidSpan: {
    background: red[50],
    borderColor: red[500],
    color: red[500],
  },
}));

const UserOrder = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <AccordionContainer
        title={<Title titolo="ordine numero" isPaid />}
        description="Spesa Totale: 400€"
      >
        <ul className={classes.list}>
          <li>
            <Typography>Oggetto: Prezzo</Typography>
          </li>
          <li>
            <Typography>Oggetto: Prezzo</Typography>
          </li>
          <li>
            <Typography>Oggetto: Prezzo</Typography>
          </li>
          <li>
            <Typography>Oggetto: Prezzo</Typography>
          </li>
          <li>
            <Typography>Oggetto: Prezzo</Typography>
          </li>
        </ul>
      </AccordionContainer>
      <AccordionContainer
        title={<Title titolo="ordine numero" />}
        description="Spesa Totale: 400€"
      >
        <div className={classes.root}>
          <ul className={classes.list}>
            <li>
              <Typography>Oggetto: Prezzo</Typography>
            </li>
            <li>
              <Typography>Oggetto: Prezzo</Typography>
            </li>
            <li>
              <Typography>Oggetto: Prezzo</Typography>
            </li>
            <li>
              <Typography>Oggetto: Prezzo</Typography>
            </li>
            <li>
              <Typography>Oggetto: Prezzo</Typography>
            </li>
          </ul>
          <div className={classes.buttonContainer}>
            <Button
              component={RouterLink}
              variant="contained"
              color="primary"
              to="order/3"
            >
              Vedi Ordine Completo
            </Button>
          </div>
        </div>
      </AccordionContainer>
    </section>
  );
};

const Title = ({ titolo, isPaid }) => {
  const { title, titleSpan, paidSpan, unPaidSpan } = useStyles();
  return (
    <div className={title}>
      {titolo}{" "}
      <span
        className={clsx(titleSpan, isPaid && paidSpan, !isPaid && unPaidSpan)}
      >
        {" "}
        {isPaid ? "Pagato" : "Da Pagare"}
      </span>
    </div>
  );
};

export default UserOrder;
