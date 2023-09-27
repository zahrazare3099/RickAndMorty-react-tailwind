import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import CharactersList from "./components/CharactersList";
import CharacterItemShow from "./components/CharacterItemShow";
import { SearchInput } from "./components/Navbar";
import { FavoritCharacter } from "./components/Navbar";

import "./App.css";

function App() {
  let [characterData, setCharacterData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchValue, setSearchValue] = useState("");
  let [clickEyeID, setClickEye] = useState(null);

  let [favoritChar, setFavoritChar] = useState([]);
  useEffect(() => {
    //create a controller
    let controller = new AbortController();

    async function fetchDate() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${searchValue}`,
          {
            // connect the controller with the HTTTPs request
            signal: controller.signal,
          }
        );
        const data = res.data.results;
        setCharacterData(data.splice(0, 10));
        setLoading(false);
        // remove the controller
        controller = null;
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

  const showCharacterDetails = (characterId) => {
    setClickEye((pre) => (pre == characterId ? null : characterId));
  };
  const handleFavoritChar = (char) => {
    setFavoritChar((pre) => [...pre, char]);
  };
  const wasFavorit = favoritChar.map((item) => item.id).includes(clickEyeID);
  //
  const handleDeleteFavorite = (id) => {
    setFavoritChar((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  return (
    <div className="App bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500">
      <nav className="sticky top-1 p-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Navbar>
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            characterlength={characterData.length}
          />
          <FavoritCharacter
            onDeleteFavorite={handleDeleteFavorite}
            favoritChar={favoritChar}
          />
        </Navbar>
      </nav>

      <section className="flex flex-col  md:flex-row  my-2 gap-2">
        <CharactersList
          characterData={characterData}
          loading={loading}
          showCharacterDetails={showCharacterDetails}
          clickEyeID={clickEyeID}
        />
        <CharacterItemShow
          clickEyeID={clickEyeID}
          handleFavoritChar={handleFavoritChar}
          wasFavorit={wasFavorit}
        />
      </section>
      <Toaster />
    </div>
  );
}

export default App;
