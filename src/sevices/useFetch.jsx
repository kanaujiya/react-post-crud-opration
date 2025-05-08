import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
const useFetch = ({ URL, Method }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    try {
      let response = await axios({
        method: Method,
        url: URL,
      });
      console.log("useFetch:", response?.data);
      setData(response?.data);
    } catch (err) {
      setError("There was a problem with the fetch operation", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [URL, Method]);
  return { data, loading, error };
};

export default useFetch;
