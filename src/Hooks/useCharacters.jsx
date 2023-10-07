import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url, itemCheck, searchValue) {
  let [characterData, setCharacterData] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    //create a controller
    let controller = new AbortController();

    async function fetchDate() {
      try {
        setLoading(true);
        const res = await axios.get(`${url}${itemCheck}${searchValue}`, {
          // connect the controller with the HTTTPs request
          signal: controller.signal,
        });
        const data = res.data.results;

        setCharacterData(data?.splice(0, 10));
        // remove the controller
        () => {
          controller = null;
        };
      } catch (err) {
        toast.error(err.message);
        setCharacterData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDate();
    //aborts the request when the component umounts
    return () => controller?.abort();
  }, [searchValue]);

  return { loading, characterData };
}
