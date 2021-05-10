import React, { useEffect } from "react";
//Custom Ui
import AdminPaperTitle from "../../components/ui/AdminPaperTitle";
import Loading from "../../components/ui/Loading";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { indigo, red } from "@material-ui/core/colors";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
//Icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
//Actions
import {
  adminGetUserList,
  deleteUser,
} from "../../reducers/actions/adminActions";
//React Redux
import { useDispatch, useSelector } from "react-redux";
//Router DOM
import { Link as RouterLink } from "react-router-dom";

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

const UserListSceeen = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.getUserList);
  const { isLoading: deleteLoading, error: deleteError } = useSelector(
    (state) => state.deleteUser
  );
  const classes = useStyles();

  const removeUser = (_id) => {
    if (window.confirm("Vuoi davvero eliminare Utente?"))
      dispatch(deleteUser(_id));
  };

  useEffect(() => {
    dispatch(adminGetUserList());
  }, [dispatch]);
  return (
    <Box>
      <AdminPaperTitle
        title="tutti gli utenti"
        description="Lista di tutti gli utenti presenti all'interno del nostro sito"
      />
      <TableContainer className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">isAdmin</TableCell>
              <TableCell align="center">isActive</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          {isLoading || deleteLoading ? (
            <h5>
              <Loading isOpen={isLoading || deleteLoading} />
            </h5>
          ) : error ? (
            <h5>{error}</h5>
          ) : (
            <TableBody>
              {users.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    <Link href={`mailto:${row.email}`}>{row.email}</Link>
                  </TableCell>
                  <TableCell align="center">
                    {row.isAdmin ? (
                      <CheckIcon className={classes.confirmIcon} />
                    ) : (
                      <ClearIcon className={classes.deleteIcon} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.isActive ? (
                      <CheckIcon className={classes.confirmIcon} />
                    ) : (
                      <ClearIcon className={classes.deleteIcon} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={RouterLink}
                      to={`/admin/user/${row._id}/edit`}
                      size="small"
                      className={classes.confirmIcon}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      className={classes.deleteIcon}
                      onClick={() => removeUser(row._id)}
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
      {deleteError && (
        <Typography variant="h3" color="secondary">
          {" "}
          {deleteError}
        </Typography>
      )}
    </Box>
  );
};

export default UserListSceeen;
