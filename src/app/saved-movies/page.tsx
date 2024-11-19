"use client";

import { Clapperboard, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  const handleRemoveMovie = async (movieId) => {
    try {
      const response = await fetch("/api/saved-movies", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movieId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to remove movie from the watchlist"
        );
      }

      // Update local state to reflect the deletion
      setSavedMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );

      toast.success("Movie removed from watchlist!");
    } catch (error) {
      console.error("Error removing movie from the watchlist:", error);
      toast.error(
        "Failed to remove movie from the watchlist. Please try again later."
      );
    }
  };

  return (
    <div className="w-full mx-auto px-32">
      <h1 className="text-2xl font-bold">Your Saved Movies</h1>

      {savedMovies.length === 0 ? (
        <div className="mt-6 text-center py-32">
          <p className="text-xl font-semibold">You have no saved movies.</p>
          <p className="text-xl font-semibold">
            Start saving movies to your watchlist!
          </p>
        </div>
      ) : (
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
              <div className="p-4 relative flex flex-col gap-4 h-full overflow-hidden">
                <button
                  onClick={() => handleRemoveMovie(movie.id)}
                  className="text-red-500 absolute top-4 right-4 font-bold bg-[#0F0F0F] primary-btn-focus flex justify-center items-center text-sm p-2 rounded-lg shadow-md"
                >
                  <X />
                </button>
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
                <p className="text-base mt-2 font-medium">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
