import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async (url) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(url);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading };
};

export default useFetch;
