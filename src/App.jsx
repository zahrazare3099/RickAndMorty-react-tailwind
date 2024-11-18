import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import CharactersList from "./components/CharactersList";
import CharacterItemShow from "./components/CharacterItemShow";
import { SearchInput } from "./components/Navbar";
import { FavoritCharacter } from "./components/Navbar";
import useCharacters from "./Hooks/useCharacters";
import uselocalStorage from "./Hooks/useLocalStorage";
import "./App.css";

function App() {
  let [clickEyeID, setClickEye] = useState(null);
  let [searchValue, setSearchValue] = useState("");
  const { loading, characterData } = useCharacters(
    "https://rickandmortyapi.com/api/character/",
    "?name=",
    searchValue
  );

  let [favoritChar, setFavoritChar] = uselocalStorage("FAVORITES", []);

  const showCharacterDetails = (characterId) => {
    setClickEye((pre) => (pre == characterId ? null : characterId));
  };
  const handleFavoritChar = (char) => {
    setFavoritChar((pre) => [...pre, char]);
  };
  const wasFavorit = favoritChar?.map((item) => item.id).includes(clickEyeID);
  //
  const handleDeleteFavorite = (id) => {
    setFavoritChar((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  return (
    <div className="App min-h-screen bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500">
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
      <Toaster position="button-right" />
    </div>
  );
}

export default App;
