import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendActivationToken } from "../../reducers/actions/validationActions";
const SendActiveScreen = () => {
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector(
    (state) => state.sendUserValidationToken
  );
  const { token } = useParams();

  useEffect(() => {
    if (!token) {
      dispatch(sendActivationToken());
    }
  }, [dispatch, token]);
  if (!token) {
    return <div>TOKEN PER ATTIVARE UN USER senza token</div>;
  } else {
    return <div>TOKEN PER ATTIVARE UN USER {token}</div>;
  }
};

export default SendActiveScreen;
