import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import { useState } from "react";
import Pagination from "./Pagination";

export default function CharactersList({
  characterData,
  loading,
  showCharacterDetails,
  clickEyeID,
}) {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(characterData.length / 5);
  const startIndex = (currentPage - 1) * 5;
  const currentItems = characterData.slice(startIndex, startIndex + 5);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <Loader />;
  return (
    <div className="basis-1/2 flex flex-col gap-2 p-2">
      {Boolean(currentItems.length) ? (
        currentItems.map((character, id) => {
          return (
            <>
              <CharacterItem
                character={character}
                key={id}
                showCharacterDetails={showCharacterDetails}
                clickEyeID={clickEyeID}
              >
                <button className="flex items-center justify-end px-2 ">
                  {character.id == clickEyeID ? (
                    <EyeIcon className="w-6 h-6 text-green-500" />
                  ) : (
                    <EyeSlashIcon className="w-6 h-6 text-red-500" />
                  )}
                </button>
              </CharacterItem>
            </>
          );
        })
      ) : (
        <div className="border border-gray-300 rounded-md p-2 shadow-lg text-white">
          didn't have a any characters
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export function CharacterItem({
  character,
  showCharacterDetails,
  clickEyeID,
  children,
}) {
  return (
    <div
      onClick={() => {
        showCharacterDetails(character.id);
      }}
      className={` ${
        character.id == clickEyeID ? "bg-fuchsia-950" : "bg-slate-800"
      } flex cursor-pointer hover:bg-fuchsia-950 justify-start overflow-hidden rounded-md text-white`}
    >
      <div className="p-2 ">
        <img
          className="h-16 w-16 max-w-none rounded-md"
          src={character.image}
          alt={character.id}
        />
      </div>
      <div className=" grid-rows-2  grid-flow-col grow text-sm items-start ">
        <div className="text-start pt-2">
          <span>{character.gender == "Male" ? "👦" : "👩"}</span>
          <span>{character.name}</span>
        </div>
        <div className="text-start items-center flex px-1">
          <span
            className={`w-2 h-2 rounded-full mt-1 ${
              character.status == "Alive" ? "bg-green-500  " : "bg-red-500 "
            } `}
          />
          &nbsp;
          <span>{character.status}</span>
          <span className="px-1 text-center"> - </span>
          <span>{character.species}</span>
        </div>
      </div>
      {/* optional */}
      {children}
    </div>
  );
}
