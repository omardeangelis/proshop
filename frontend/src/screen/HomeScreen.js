import React, { useEffect } from "react";
import Product from "../components/Product";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
//Redux Import
import { useDispatch, useSelector } from "react-redux";
import {
  listProduct,
  cleanProductList,
} from "../reducers/actions/productListActions";

const HomeScreen = () => {
  //Permette di dispatchare le nostre azioni
  const dispatch = useDispatch();

  //Prendo gli state che sono gestiti dal productListReducer
  const productList = useSelector((state) => state.productList);

  //Descostruisco l'oggetto contente gli state
  const { products, isLoading } = productList;

  //USECALLBACK solution
  //  useCallback(
  //    useEffect(() => {
  //      dispatch(listProduct());
  //    }, [dispatch]),
  //    [products]
  //  );

  //In useEffect chiamo la mia azione al render del componente
  useEffect(() => {
    dispatch(listProduct());
    //Eliminiamo i prodotti se no abbiamo immagini vecchie prima del nuovo loading
    return () => dispatch(cleanProductList());
  }, [dispatch]);

  return (
    <section className="section-verticale">
      <Typography align="center" variant="h4">
        I Nostri Prodotti
      </Typography>
      <Grid container justify="flex-start" spacing={4} alignItems="baseline">
        {!isLoading
          ? products.map((el) => {
              return (
                <Grid key={el._id} item xs={12} sm={6} md={4} lg={3}>
                  <Product {...el} />
                </Grid>
              );
            })
          : Array.from(new Array(6)).map((_, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <Skeleton variant="rect" height={350} />
                </Grid>
              );
            })}
      </Grid>
    </section>
  );
};

export default HomeScreen;
