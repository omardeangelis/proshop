import React from "react";
//Material UI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { grey, indigo } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
//Icons
import KeyboardBackspaceRoundedIcon from "@material-ui/icons/KeyboardBackspaceRounded";
//Router DOM
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";
//CustomHook
import useFetch from "../custom/useFetch";
//Custom Ui Component
import Loading from "../components/ui/Loading";
// Utils
import { formatPrice } from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
    background: grey[50],
    paddingTop: "1rem",
    paddingBottom: "1rem",
    display: "grid",
    gap: "1rem",
    boxShadow: "var(--light-shadow)",
    borderRadius: "var(--radius)",
  },
  addressContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  summary: {
    color: indigo[400],
    fontWeight: 800,
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
  item: {
    color: indigo[400],
    fontWeight: 800,
  },
}));

const SingleOrderScreen = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { isAdmin } = useSelector((state) => state.login);
  const { isLoading, data } = useFetch(`/api/order/${id}`);
  console.log(data);
  if (isLoading) {
    return <Loading isOpen={isLoading} />;
  } else {
    return (
      <>
        <Button
          component={RouterLink}
          to="/profile"
          variant="text"
          color="primary"
          style={{ marginTop: "1rem" }}
          startIcon={<KeyboardBackspaceRoundedIcon />}
        >
          Torna al Tuo Profilo
        </Button>
        <Container maxWidth="sm" className={classes.root}>
          <Grid container justify="space-between">
            <Grid item xs={5} md={4} lg={3}>
              <Typography variant="subtitle2">Ordine numero {id}</Typography>
            </Grid>
            <Grid
              item
              xs={5}
              md={4}
              lg={3}
              className={classes.addressContainer}
            >
              <address>
                <Typography variant="body2">Nome Cognome</Typography>
                <Typography variant="body2">
                  {data.shippingAddress.indirizzo1}
                </Typography>
                <Typography variant="body2">
                  {data.shippingAddress.city} {data.shippingAddress.cap},{" "}
                  {data.shippingAddress.paese}
                </Typography>
              </address>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="h4" align="center">
            Riepilogo Ordine
          </Typography>
          <Container
            maxWidth="sm"
            style={{ display: "inherit", gap: "inherit" }}
          >
            <Grid container justify="space-between">
              <Grid item xs={5}>
                <Typography> Spesa Totale: {data.totalPrice}</Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography align="right">
                  Data:{" "}
                  {data.paymentResult
                    ? new Date(
                        Date(data.paymentResult.update_time).toString()
                      ).toDateString()
                    : new Date(Date.parse(data.updatedAt)).toDateString()}
                </Typography>
              </Grid>
            </Grid>
            <div>
              <Typography variant="overline" className={classes.summary}>
                Riassunto
              </Typography>
              <ul className={classes.list}>
                {data.orderItems.map((item) => {
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
            </div>
          </Container>
          <Divider />
          <Container maxWidth="md">
            <Grid container justify="space-between" component="li">
              <Grid item xs={5}>
                <Typography>
                  {" "}
                  Pagamento: {data.isPaid ? "Pagato" : "Da Pagare"}{" "}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography align="right">
                  Stato: {data.isDeliverd ? "Spedito" : "Da Spedire"}
                </Typography>
              </Grid>
            </Grid>{" "}
          </Container>
          <Container maxWidth="xs">
            <Button variant="contained" color="primary" fullWidth>
              {isAdmin ? "Modifica Spedizione" : "Completa Pagamento"}
            </Button>
          </Container>
        </Container>
      </>
    );
  }
};

export default SingleOrderScreen;
