import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CharacterItem } from "./CharactersList";
import logopic from "../assets/rickAndmorty.jpg";
import Modal from "./Modal";

export default function Navbar({ children }) {
  return (
    <div className="  bg-fuchsia-600 flex justify-between items-center  p-2 rounded-md">
      <Logo />
      {children}
    </div>
  );
}

export function Logo() {
  return (
    <div className="font-serif flex px-1 items-center">
      <img src={logopic} alt="" className="w-7 h-7 rounded-full" />
      &nbsp;
      <span>Rick & Morty</span>
    </div>
  );
}

export function SearchInput({ searchValue, setSearchValue, characterlength }) {
  return (
    <div className="p-1  bg-transparent text-fuchsia-900 flex flex-col sm:flex-row items-center ">
      <span className="px-2 font-thin text-center">
        ( found <strong>{characterlength}</strong> character )
      </span>

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="🔎 Search in Characters"
        className=" px-1 bg-transparent placeholder:text-fuchsia-900 focus:outline-none"
      ></input>
    </div>
  );
}

export function FavoritCharacter({ onDeleteFavorite, favoritChar }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List of Favourites">
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-1 overflow-y-auto">
          {favoritChar.map((character) => {
            return (
              <CharacterItem
                character={character}
                key={character.id}
                showCharacterDetails={() => {}}
                clickEyeID={0}
              >
                <button
                  onClick={() => onDeleteFavorite(character.id)}
                  className="flex items-center justify-end px-2 "
                >
                  <TrashIcon className="w-6 h-6 text-red-500" />
                </button>
              </CharacterItem>
            );
          })}
        </div>
      </Modal>

      <div
        className="relative flex items-end justify-end cursor-pointer"
        onClick={() => setIsOpen((is) => !is)}
      >
        <HeartIcon className="relative w-8 h-8  stroke-red-500" />
        <span className="absolute text-xs font-bold text-white mb-1 bg-red-500 rounded-full w-4 h-4">
          {favoritChar.length}
        </span>
      </div>
    </>
  );
}
