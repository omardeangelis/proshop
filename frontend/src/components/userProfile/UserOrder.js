import React, { useEffect } from "react";
// Custom Component & function
import AccordionContainer from "../ui/Accordion";
import { formatPrice } from "../../utils/helpers";
// Router
import { Link as RouterLink } from "react-router-dom";
// Material Ui
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { red, green, indigo } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
//utils dependencies
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
//Redux
import { useSelector, useDispatch } from "react-redux";
// Actions
import { getAllUserOrders } from "../../reducers/actions/orderActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gap: "2rem",
  },
  list: {
    marginBottom: "2rem",
    background: "#f6f7fb",
    padding: "1rem",
    listStyle: "none",
    borderRadius: "var(--radius)",
    display: "grid",
    gap: "1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
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
  item: {
    color: indigo[400],
    fontWeight: 800,
  },
}));

const UserOrder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const { isLoading, error, orderList } = useSelector(
    (state) => state.orderList
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (!orderList) {
      dispatch(getAllUserOrders());
    } else {
      setPages(orderList.length > 1 ? orderList.length : 1);
    }
  }, [dispatch, orderList]);

  if (isLoading) {
    return <Typography variant="caption">Loading...</Typography>;
  }
  if (error) {
    return (
      <Typography variant="caption" color="secondary">
        {error}
      </Typography>
    );
  }
  if (!isLoading && !orderList.length > 0) {
    return (
      <Typography variant="caption" color="secondary">
        Non Hai Ancora Effettuato Nessun Ordine
      </Typography>
    );
  }
  return (
    <section className={classes.root}>
      {orderList[page - 1].map((order) => {
        return (
          <AccordionContainer
            key={order._id}
            title={
              <Title titolo={`Ordine: ${order._id}`} isPaid={order.isPaid} />
            }
            description={`Spesa Totale: ${order.totalPrice}`}
          >
            <ul className={classes.list}>
              {order.orderItems.map((item) => {
                return (
                  <Grid
                    container
                    justify="space-between"
                    component="li"
                    key={uuidv4()}
                  >
                    <Grid item xs={8}>
                      <Typography className={classes.item}>
                        {item.name} x {item.qty}
                      </Typography>{" "}
                    </Grid>
                    <Grid item xs={3}>
                      <Typography align="right">
                        {" "}
                        {formatPrice(item.qty * item.price)}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </ul>
            <Box className={classes.buttonContainer}>
              <Button
                component={RouterLink}
                to={`/order/${order._id}`}
                variant="outlined"
                color="primary"
              >
                Vedi Ordine Completo
              </Button>
            </Box>
          </AccordionContainer>
        );
      })}
      {orderList.length > 1 && (
        <Box className={classes.buttonContainer}>
          <Pagination count={pages} page={page} onChange={handleChange} />
        </Box>
      )}
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
