import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch(url, operatorSymboll, query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let controller = new AbortController();
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await axios.get(`${url}${operatorSymboll}${query}`, {
          // connect the controller with the HTTTPs request
          signal: controller.signal,
        });
        setData(data.results);

        () => (controller = null);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller?.abort();
  }, [query]);
  return { data, loading };
}
