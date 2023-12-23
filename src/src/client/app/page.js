import Link from "next/link";

export default function Home() {
  return (
      <div>
        <p> Home Page </p>
        <Link href={"/search"}>Navigate To search</Link>
      </div>
  );
}
