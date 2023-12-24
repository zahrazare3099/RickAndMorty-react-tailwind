import { useEffect, useState } from "react";

export default function uselocalStorage(categoryName, initialState) {
  // get
  let [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(categoryName)) || initialState
  );
  // set
  useEffect(() => {
    localStorage.setItem(categoryName, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}

//   let [favoritChar, setFavoritChar] = useState(
//     () => JSON.parse(localStorage.getItem("FAV")) || []
//   );

//   useEffect(() => {
//     localStorage.setItem("FAV", JSON.stringify(favoritChar));
//   }, [favoritChar]);
