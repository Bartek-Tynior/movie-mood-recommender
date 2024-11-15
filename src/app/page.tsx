import MoodCard from "@/app/components/MoodCard";
import content from "../../content";

export default function Home() {
  return (
    <div className="w-full p-2 lg:p-6 mb-20 md:mb-24 max-w-4xl mx-auto">
      <h1>
        <span className="text-primary">Mood</span>Flix
      </h1>

      <p className="text-gray-300 mt-2 md:mt-4">
        Discover movies based on your mood.
      </p>

      <p>How are you feeling now?</p>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {content.moods.map((mood, index) => (
          <MoodCard key={index} mood={mood} />
        ))}
      </div>
    </div>
  );
}
