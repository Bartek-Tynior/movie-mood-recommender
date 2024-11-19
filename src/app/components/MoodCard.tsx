"use client";

interface Mood {
  name: string;
  description: string;
}

export default function MoodCard({ mood, onClick }: { mood: Mood; onClick: (mood: string) => void }) {
  const handleClick = () => {
    onClick(mood.name);
  };

  return (
    <button
      onClick={handleClick}
      className="border border-solid border-red-500 rounded-md shadow-md flex justify-center items-center hover:bg-red-500"
    >
      <p className="p-4 font-semibold">{mood.name}</p>
    </button>
  );
}
