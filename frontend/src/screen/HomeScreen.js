import React from "react";
import useFetch from "../custom/useFetch";
import Product from "../components/Product";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
const HomeScreen = () => {
  const { data: products, isLoading } = useFetch("/api/products");
  return (
    <section className="section-verticale">
      <Typography align="center" variant="h4">
        I Nostri Prodotti
      </Typography>
      {!isLoading ? (
        <Grid container justify="flex-start" spacing={4} alignItems="baseline">
          {products.map((el) => {
            return (
              <Grid key={el._id} item xs={12} sm={6} md={4} lg={3}>
                <Product {...el} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <h4> Loading... </h4>
      )}
    </section>
  );
};

export default HomeScreen;
