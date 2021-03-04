import React, { useEffect } from "react";
import Loading from "../../components/ui/Loading";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendActivationToken,
  profileActivation,
} from "../../reducers/actions/validationActions";
import { Container } from "@material-ui/core";
import styled from "styled-components";
const SendActiveScreen = () => {
  const dispatch = useDispatch();

  //State value per invio validazione
  const { isLoading, error } = useSelector(
    (state) => state.sendUserValidationToken
  );

  //State value per validazione user
  const { isLoading: activeLodaing, error: activeError } = useSelector(
    (state) => state.validateProfileActivation
  );

  const { user } = useSelector((state) => state.profile);
  const { token } = useParams();
  //invia mail o valida e attiva l'account dell'user
  useEffect(() => {
    if (!token) {
      dispatch(sendActivationToken());
    } else {
      dispatch(profileActivation(token));
    }
  }, [dispatch, token]);
  if (!token) {
    if (isLoading) return <Loading isOpen={isLoading}></Loading>;
    if (error)
      return (
        <Wrapper maxWidth="sm">
          {" "}
          <Alert severity="error">
            <AlertTitle>C'è stato un problema</AlertTitle> Problema con invio
            mail. Riprova più tardi
          </Alert>
        </Wrapper>
      );
    return (
      <Wrapper maxWidth="sm">
        <Alert severity="info">
          <AlertTitle>Attivazione inviata</AlertTitle>
          Per attivare account segui istruzioni inviate all'indirizzo{" "}
          {user ? user.email : "La tua mail"}
        </Alert>
      </Wrapper>
    );
  } else {
    if (activeLodaing) {
      return <Loading isOpen={activeLodaing}></Loading>;
    }
    if (activeError) {
      return (
        <Wrapper maxWidth="sm">
          <Alert severity="error">
            <AlertTitle>Attivazione Fallita</AlertTitle>
            {activeError}{" "}
            <RouterLink to="/activeuser">
              {" "}
              <b>qui</b>{" "}
            </RouterLink>
          </Alert>
        </Wrapper>
      );
    }
    return (
      <Wrapper maxWidth="sm">
        <Alert severity="success">
          <AlertTitle>Attivazione completata</AlertTitle>
          Ora puoi accedere a tutte le fuznioni
        </Alert>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
        >
          Torna alla Home
        </Button>
      </Wrapper>
    );
  }
};

const Wrapper = styled(Container)`
  display: grid;
  place-items: center;
  gap: 2rem;
`;

export default SendActiveScreen;
