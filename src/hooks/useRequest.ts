import { useState, useEffect } from "react";

export function useRequest(url: string) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        let response = await fetch(url);
        let data = await response.json();
        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return [data, isLoading, error];
}

export default useRequest;

// https://codesandbox.io/s/react-hooks-userequest-i94l2?file=/src/useRequest.js:0-596
