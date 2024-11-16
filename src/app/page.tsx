"use client";

import { useState } from "react";
import MoodCard from "@/app/components/MoodCard";
import content from "../../content";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState("");

  const handleLoadingState = (isLoading, mood) => {
    setLoading(isLoading);
    setCurrentMood(mood || "");
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
            Loading movies for <strong className="text-red-500">{currentMood}</strong>...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-36">
          {content.moods.map((mood, index) => (
            <MoodCard key={index} mood={mood} onLoading={handleLoadingState} />
          ))}
        </div>
      )}
    </div>
  );
}
