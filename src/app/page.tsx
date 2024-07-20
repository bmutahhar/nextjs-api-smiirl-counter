import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen p-24">
      <div className="flex flex-col gap-8 items-start">
      <h1 className="text-4xl">Smiirl Counter For Youtube Subscriber</h1>
      <button className="bg-white py-2 px-3 text-black rounded">
      <Link href="/api/subscriber-count">
      Go to Counter API
      </Link>
      </button>
      </div>
    </main>
  );
}
