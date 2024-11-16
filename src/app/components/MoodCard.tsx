"use client";

import { useRouter } from "next/navigation";

export default function MoodCard({ mood, onLoading }) {
  const router = useRouter();

  const getMovies = async (mood) => {
    onLoading(true, mood); // Notify parent about loading
    try {
      const response = await fetch(`/api/movies?mood=${mood}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      console.log("Movies:", data.movies);

      // Simulate a delay of 5 seconds before navigation
      setTimeout(() => {
        onLoading(false); // Notify parent that loading is complete
        router.push(`/movies?mood=${mood}`);
      }, 1500);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      onLoading(false); // Notify parent that loading is complete
    }
  };

  return (
    <button
      onClick={() => getMovies(mood.name)}
      className="border border-solid border-red-500 rounded-md flex justify-center items-center hover:bg-red-500"
    >
      <p className="p-4 font-semibold">{mood.name}</p>
    </button>
  );
}
