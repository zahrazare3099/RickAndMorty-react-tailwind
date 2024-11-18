import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowUpCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Pagination from "./Pagination";

export default function CharacterItemShow({
  clickEyeID,
  handleFavoritChar,
  wasFavorit,
}) {
  let [character, setCharacter] = useState([]);
  let [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    async function fetchDate() {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${clickEyeID}`
        );
        setCharacter(data);

        let episodesIds = data.episode.map((ep) => ep.split("/").at(-1));

        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesIds}`
        );
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error(error.message);
      }
    }
    if (typeof clickEyeID == "number") {
      fetchDate();
    }
    if (typeof clickEyeID == "object") {
      setCharacter([]);
      setEpisodes([]);
    }
  }, [clickEyeID]);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(episodes.length / 5);
  const startIndex = (currentPage - 1) * 5;
  const currentEpisodes = episodes?.slice(startIndex, startIndex + 5);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="basis-2/3 p-2 overflow-hidden bg-slate-900 rounded-md text-white">
      {character.length == 0 ? (
        <div className="basis-2/3 mb-2 p-2 flex justify-center border overflow-hidden bg-slate-900 rounded-md text-white">
          please select one character
        </div>
      ) : (
        <div className="h-44 min-h-44 flex mb-2 border-2  border-purple-800 rounded bg-fuchsia-950">
          <div className="basis-1/2">
            <img
              className="h-full w-full"
              src={character.image}
              alt={character.id}
            />
          </div>
          <div className="basis-2/3 flex flex-col grow pt-2 justify-around">
            <div className="text-start flex px-2 font-bold">
              <span className="pr-1">
                {character.gender == "Male" ? "👦" : "👩"}
              </span>
              <span>{character.name}</span>
            </div>
            <div className="flex items-center px-3">
              <span
                className={`w-2 h-2 rounded-full mt-1 ${
                  character.status == "Alive" ? "bg-green-500  " : "bg-red-500 "
                } `}
              />
              &nbsp;
              <span>{character.status}</span> &nbsp; - &nbsp;
              <span>{character.species}</span>
            </div>
            <div className="flex flex-col items-start px-2 pt-1 text-start">
              <span className="font-serif text-sm text-gray-500">
                Last known Location :
              </span>
              <span className="flex text-sm font-bold text-start">
                &nbsp;-&nbsp;{character.location.name}
              </span>
            </div>
            <div className="flex p-2 items-center">
              {wasFavorit ? (
                <div className="flex justify-between font-serif p-1 w-52 bg-gray-400 text-green-700 rounded-xl">
                  <span className="text-start">Already added to favorit</span>
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
              ) : (
                <button
                  className="btn font-serif w-52 bg-gray-400 rounded-xl p-1"
                  onClick={() => handleFavoritChar(character)}
                >
                  Add to Favorit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <CharacterEpisodes
        totalPages={totalPages}
        episodes={currentEpisodes}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}
export function CharacterEpisodes({
  episodes,
  handlePageChange,
  totalPages,
  currentPage,
}) {
  let [sortBy, setSortBy] = useState(true);
  let episodSortedData;
  if (sortBy) {
    episodSortedData = [...episodes].sort(
      (a, b) => new Date(a.air_date) - new Date(b.air_date)
    );
  } else {
    episodSortedData = [...episodes].sort(
      (a, b) => new Date(b.air_date) - new Date(a.air_date)
    );
  }

  return (
    <div className="flex flex-col items-start border rounded-md p-2">
      <div className="flex justify-between mb-2 items-center text-gray-500 w-full">
        <div className="font-bold ">List of Episodes :</div>
        <span
          className="flex px-2 "
          style={{ sIndex: "-1" }}
          onClick={() => setSortBy((pre) => !pre)}
        >
          <ArrowUpCircleIcon
            className="w-6 h-6 "
            style={{
              rotate: sortBy ? "0deg" : "180deg",
              transition: "ease-in-out 0.1s",
            }}
          />
        </span>
      </div>
      {Boolean(episodSortedData.length) ? (
        episodSortedData.map((item, index) => {
          return (
            <div
              className="flex py-1 justify-between text-sm w-full"
              key={index}
            >
              <div className="flex-1 text-start">
                <span>
                  {String(index + 1).padStart(2, "0")}-{item.episode}
                </span>
                &nbsp;
                <strong>{item.name}</strong>
              </div>
              <div className="basis-36 text-sm flex items-center justify-center">
                <span className="bg-gray-500 rounded-xl p-1 basis-36 ">
                  {item.air_date}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div>&nbsp;-&nbsp;{"".padStart(2, "0")}&nbsp;Episodes</div>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
