import {useState, useEffect} from 'react';
import {fetchData, createPayload} from './fetchData';

export const useFetch = (query, variables) => {
  const [result, setResult] = useState({});
  const payload = createPayload(query, variables);

  useEffect(() => {
    fetchData(payload).then((result) => setResult(result));
  }, [payload]);

  return result;
};
