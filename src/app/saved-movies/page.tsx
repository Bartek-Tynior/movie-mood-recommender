"use client";

import { Clapperboard, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function SavedMoviesPage() {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const fetchSavedMovies = async () => {
      const response = await fetch("/api/saved-movies", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setSavedMovies(data.movies);

      console.log(data.movies);
    };

    fetchSavedMovies();
  }, []);

  return (
    <div className="w-full mx-auto px-32">
      <h1 className="text-2xl font-bold">Your Saved Movies</h1>

      <div className="flex flex-col gap-10 mt-6">
        {savedMovies.map((movie, index) => (
          <div
            key={index}
            className="rounded-md bg-white bg-opacity-10 w-full flex flex-row justify-between shadow-lg p-4"
          >
            <img
              className="w-40 object-fit rounded-md"
              src={movie.poster}
              alt={movie.title}
            />
            <div className="p-4 flex flex-col gap-4 h-full overflow-hidden">
              <h2 className="font-bold text-xl">{movie.title}</h2>
              <div className="flex flex-row gap-6">
                <p className="text-base font-semibold text-gray-500 flex gap-2">
                  <Clapperboard />
                  {movie.year}
                </p>
                <p className="text-base font-semibold text-gray-500 flex gap-2">
                  <Star className="text-yellow-500" />
                  {movie.rating}
                </p>
              </div>
              <div className="flex flex-row gap-2">
                {movie.genres.map((genre, index) => (
                  <div
                    key={index}
                    className="bg-red-500 shadow-md rounded-md py-1 px-2"
                  >
                    <span className="text-sm text-white font-semibold">
                      {genre}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-base mt-2 font-medium">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
