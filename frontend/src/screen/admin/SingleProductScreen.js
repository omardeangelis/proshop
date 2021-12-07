import React, { useEffect, useState } from "react";
//React Router Dom
import { useParams } from "react-router-dom";
//React Redux
import { useSelector, useDispatch } from "react-redux";
//Material UI
import Image from "material-ui-image";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
//Icon
import EditIcon from "@material-ui/icons/Edit";
//Custom Components
import useFetch from "../../custom/useFetch";
import AdminPaperTitle from "../../components/ui/AdminPaperTitle";
import Loading from "../../components/ui/Loading";
//Utils
//Actions
import {
  updateProductById,
  resetUpdateProductState,
} from "../../reducers/actions/productListActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gap: theme.spacing(2),
  },
  inputBox: {
    display: "grid",
    width: "100%",
    gap: "1rem",
  },
  image: {
    width: 125,
    height: 125,
    position: "relative",
  },
  btnGruop: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    width: "50%",
    justifyContent: "center",
  },
}));

const SingleProductScreen = () => {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`/api/products/${id}`);
  const dispatch = useDispatch();
  const {
    isLoading: updateLoading,
    // success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.updateProduct);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    category: "",
    brand: "",
  });
  const [checked, setChecked] = React.useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      setInput({
        name: data.name,
        description: data.description,
        price: data.price,
        countInStock: data.countInStock,
        category: data.category,
        brand: data.brand,
      });
      setChecked(data.isDeleted);
    }
  }, [data]);

  if (isLoading) {
    return <Loading isOpen={isLoading || updateLoading} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductById(id, { ...input, isDeleted: checked }));
  };

  const handleChange = (e) => {
    if (updateError) dispatch(resetUpdateProductState());
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  return (
    <Container className={classes.root}>
      <AdminPaperTitle
        title={"Modifica Prodotto"}
        description="La rimozione di un Prodotto in Maniera definitiva deve essere Approvata da un Responsabile. Qui sarà possibile solo rimuovere l'elemento dallo stock"
      />
      <Divider />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container justify="space-between" spacing={8}>
          <Grid item xs={12} md={6} className={classes.inputBox}>
            <FormControl>
              <FormHelperText>Modifica Nome</FormHelperText>
              <OutlinedInput
                id="name"
                name="name"
                margin="dense"
                value={input.name}
                onChange={handleChange}
              ></OutlinedInput>
            </FormControl>
            <FormControl>
              <FormHelperText>Descrizione del prodotto</FormHelperText>
              <OutlinedInput
                id="description"
                name="description"
                multiline
                value={input.description}
                onChange={handleChange}
              ></OutlinedInput>
            </FormControl>
            <Grid container justify="space-between" spacing={2}>
              <Grid item xs={4}>
                <FormControl>
                  <FormHelperText>Prezzo</FormHelperText>
                  <OutlinedInput
                    margin="dense"
                    id="price"
                    name="price"
                    value={input.price}
                    onChange={handleChange}
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <FormHelperText>Qty</FormHelperText>
                  <OutlinedInput
                    margin="dense"
                    id="countInStock"
                    name="countInStock"
                    value={input.countInStock}
                    onChange={handleChange}
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <FormHelperText>Numero Recensioni</FormHelperText>
                  <OutlinedInput
                    margin="dense"
                    id="rating"
                    name="rating"
                    readOnly
                    value={data.rating}
                    onChange={handleChange}
                  ></OutlinedInput>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justify="space-between" spacing={8}>
              <Grid item xs={6}>
                <FormHelperText>Categoria</FormHelperText>
                <OutlinedInput
                  margin="dense"
                  id="cetegory"
                  name="category"
                  value={input.category}
                  onChange={handleChange}
                ></OutlinedInput>
              </Grid>
              <Grid item xs={6}>
                <FormHelperText>Brand</FormHelperText>
                <OutlinedInput
                  margin="dense"
                  id="brand"
                  name="brand"
                  value={input.brand}
                  onChange={handleChange}
                ></OutlinedInput>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <FormControl>
                  <FormHelperText>Disponibilità </FormHelperText>
                  <FormControlLabel
                    label="Disponibile nello store"
                    control={
                      <Checkbox
                        checked={!checked}
                        onChange={() => setChecked(!checked)}
                        color="primary"
                      />
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="flex-end" spacing={3}>
                  <Grid item xs={4}>
                    <FormHelperText>Immagine Prodotto</FormHelperText>
                    <Box className={classes.image}>
                      <Image src={data.image}></Image>
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <Input
                      variant="outlined"
                      color="primary"
                      size="small"
                      type="file"
                    >
                      Cambia Immagine
                    </Input>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box className={classes.btnGruop}>
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
          >
            Modifica
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SingleProductScreen;
