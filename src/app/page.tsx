"use client";

import { useState } from "react";
import MoodCard from "@/app/components/MoodCard";
import content from "../../content";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState("");
  const router = useRouter();

  const handleMoodClick = async (mood) => {
    setLoading(true);
    setCurrentMood(mood);

    try {
      // Navigate to the movie page with the mood
      setTimeout(() => {
        setLoading(false);
        router.push(`/movies?mood=${mood}`);
      }, 1500);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 px-20 mx-auto">
      <div className="w-full flex gap-6 flex-col justify-center items-center">
        <p className="text-2xl text-gray-500">
          Discover movies based on your mood.
        </p>
        <p className="text-large font-semibold">How are you feeling now?</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-white">
            Loading movies for{" "}
            <strong className="text-red-500">{currentMood}</strong>...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-36">
          {content.moods.map((mood, index) => (
            <MoodCard key={index} mood={mood} onClick={handleMoodClick} />
          ))}
        </div>
      )}
    </div>
  );
}
