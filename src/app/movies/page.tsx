"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const mood = searchParams.get("mood");
  const [movies, setMovies] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [noMoreMovies, setNoMoreMovies] = useState(false);

const isFetching = useRef(false);

useEffect(() => {
  if (!mood || !page || isFetching.current) return;

  const fetchMovies = async () => {
    isFetching.current = true;
    setLoading(true);

    try {
      const response = await fetch(`/api/movies?mood=${mood}&page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      if (data.movies.length === 0) {
        setNoMoreMovies(true);
      } else {
        setMovies((prev) => [...prev, ...data.movies]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  fetchMovies();
}, [mood, page]);


  const currentMovie = movies[currentIndex];

  const handleNext = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (!noMoreMovies) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSaveMovie = async (movie) => {
    try {
      const response = await fetch("/api/saved-movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save movie");
      }

      toast.success("Movie saved to watchlist!");
    } catch (error) {
      console.error("Error saving movie:", error);
      toast.error("Failed to save movie. Please try again later.");
    }
  };

  return (
    <div className="w-full px-20 mx-auto">
      <ToastContainer
        position="top-right"
        hideProgressBar
        autoClose={2000}
        theme="dark"
      />
      <h1 className="text-2xl font-bold mb-6">Movies for Mood: {mood}</h1>
      { currentMovie ? (
        <div className="w-full h-2/3 flex flex-col items-center">
          <div className="rounded-md bg-white bg-opacity-10 w-full h-96 flex flex-col justify-between shadow-lg">
            <img
              src={currentMovie.poster}
              alt={currentMovie.title}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4 flex flex-col gap-2 h-full overflow-hidden">
              <h2 className="font-bold text-lg">{currentMovie.title}</h2>
              <p className="text-sm text-gray-500">{currentMovie.year}</p>
              <p className="text-sm text-gray-500">
                Rating: {currentMovie.rating}
              </p>
              {currentMovie.genres && (
                <p className="text-sm text-gray-500">
                  Genres: {currentMovie.genres.join(", ")}
                </p>
              )}
              <p className="text-sm mt-2 font-medium overflow-hidden text-ellipsis h-16">
                {currentMovie.description}
              </p>
            </div>
          </div>
          <div className="flex mt-4 gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-transparent text-white border border-red-500 rounded disabled:opacity-50 hover:bg-red-500"
            >
              Previous
            </button>
            <button
              onClick={() => handleSaveMovie(currentMovie)}
              className="px-4 py-2 bg-transparent text-white border border-red-500 rounded disabled:opacity-50 hover:bg-red-500"
            >
              Add to Watchlist
            </button>
            <button
              onClick={handleNext}
              disabled={noMoreMovies && currentIndex === movies.length - 1}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No movies found for this mood.</p>
      )}
    </div>
  );
}
