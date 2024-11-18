"use client";

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
    <div className="w-full mx-auto px-20">
      <h1 className="text-2xl font-bold">Your Saved Movies</h1>

      <div className="flex flex-col gap-10 mt-6">
        {savedMovies.map((movie, index) => (
          <div
            key={index}
            className="rounded-md bg-white bg-opacity-10 w-full flex flex-col justify-between shadow-lg p-4"
          >
            <div className="p-4 flex flex-col gap-2 h-full overflow-hidden">
              <h2 className="font-bold text-lg">{movie.title}</h2>
              <p className="text-sm text-gray-500">{movie.year}</p>
              <p className="text-sm text-gray-500">Rating: {movie.rating}</p>
              {movie.genres && (
                <p className="text-sm text-gray-500">
                  Genres: {movie.genres.join(", ")}
                </p>
              )}
              <p className="text-sm mt-2 font-medium overflow-hidden text-ellipsis h-16">
                {movie.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
