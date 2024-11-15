import MoodCard from "@/app/components/MoodCard";
import content from "../../content";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-10 px-20 mx-auto">
      <div className="w-full flex gap-6 flex-col justify-center items-center">
        <p className="text-2xl text-gray-500">
          Discover movies based on your mood.
        </p>

        <p className="text-large font-semibold">How are you feeling now?</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-36">
        {content.moods.map((mood, index) => (
          <MoodCard key={index} mood={mood} />
        ))}
      </div>
    </div>
  );
}
