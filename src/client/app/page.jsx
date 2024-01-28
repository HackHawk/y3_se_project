import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background with Blur Effect */}
      <Image
        src="/homepage-banner.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        style={{ filter: 'blur(10px)' }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 md:bg-gradient-to-br from-transparent via-black/20 to-black/60"
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-9xl text-white">
          እነሆ መጻሕፍት <br /> Enho Books
        </h1>
        <p className="mt-5 text-4xl text-white">
          እንኳን ወደ እንሆ ቤተ-መጻሕፍት በደህና መጡ። <br /> Welcome to Enho Books!
        </p>
        <div className="mt-8">
          <Link href="/search" className="inline-flex items-center justify-center gap-x-3 px-6  py-3 text-xl font-medium text-white bg-gradient-to-tl from-blue-600 to-violet-600 rounded-full hover:from-violet-600 hover:to-blue-600 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800">
              Search our catalogue
              {/* SVG icon can be placed here */}
          </Link>
        </div>
      </div>
    </div>
  );
}
