import Image from "next/image";
import img from '../public/hero-img.png'

export default function Home() {
  return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="hero-content flex justify-around">
          <div className="max-w-md text-left px-3">
            <h1 className="text-5xl font-bold">Improve Your Cloud Storage Experience</h1>
            <p className="py-6">Welcome to My File Manager, the ultimate solution for seamless cloud file management. Whether you're an individual user or a business professional, My File Manager empowers you to organize, access, and share your files effortlessly across multiple cloud storage services.</p>
            <a href="/sign-up"><button className="btn rounded-lg bg-blue-600 text-white hover:bg-black p-4">Sign Up Today</button></a>
          </div>
          <div className="">
            <Image
            src={img}
            alt="My File Manager"
            width={900}
            />
          </div>
        </div>
      </div>
  );
}
