import React from "react";
import products from "../products";
import Product from "../components/Product";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
const HomeScreen = () => {
  return (
    <section className="section-verticale">
      <Typography align="center" variant="h4">
        I Nostri Prodotti
      </Typography>
      <Grid container justify="flex-start" spacing={4} alignItems="baseline">
        {products.map((el) => {
          return (
            <Grid key={el._id} item xs={12} sm={6} md={4} lg={3}>
              <Product {...el} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default HomeScreen;
