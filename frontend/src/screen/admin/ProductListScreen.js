import React, { useEffect } from "react";
//Custom Components
import AdminPaperTitle from "../../components/ui/AdminPaperTitle";
import Loading from "../../components/ui/Loading";
//Utils
import { formatPrice } from "../../utils/helpers";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { indigo, red } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
//Icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
//React Redux
import { useDispatch, useSelector } from "react-redux";
//Router Dom
import { Link as RouterLink } from "react-router-dom";
//Actions
import {
  listProduct,
  cleanProductList,
} from "../../reducers/actions/productListActions";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(2),
  },
  confirmIcon: {
    color: indigo[400],
  },
  deleteIcon: {
    color: red["A700"],
  },
}));

const ProductListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, products, error } = useSelector(
    (state) => state.productList
  );

  const removeProduct = (id) => {
    console.log("rimosso");
  };

  useEffect(() => {
    dispatch(listProduct());
    return () => dispatch(cleanProductList());
  }, [dispatch]);
  return (
    <Box>
      <Grid container justify="space-between" spacing={4}>
        <Grid item xs={12} sm={9}>
          <AdminPaperTitle
            title="Lista dei prodotti"
            description="Lista di tutti gli i prodotti divisi per id, nome, stato, stock, prezzo, review di ogni prodotto"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button startIcon={<AddIcon />} variant="contained" color="primary">
            Nuovo Prodotto
          </Button>
        </Grid>
      </Grid>
      <TableContainer className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Stato</TableCell>
              <TableCell align="center">Prezzo</TableCell>
              <TableCell align="center">Review</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <h5>
              <Loading isOpen={isLoading} />
            </h5>
          ) : error ? (
            <h5>{error}</h5>
          ) : (
            <TableBody>
              {products.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">
                    {row.countInStock || (
                      <ClearIcon className={classes.deleteIcon} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {!row.isDeleted ? (
                      <CheckIcon className={classes.confirmIcon} />
                    ) : (
                      <ClearIcon className={classes.deleteIcon} />
                    )}
                  </TableCell>
                  <TableCell align="center">{formatPrice(row.price)}</TableCell>
                  <TableCell align="center">
                    {row.numReviews || (
                      <ClearIcon className={classes.deleteIcon} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={RouterLink}
                      to={`/admin/product/${row._id}/edit`}
                      size="small"
                      className={classes.confirmIcon}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      className={classes.deleteIcon}
                      onClick={() => removeProduct(row._id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductListScreen;
