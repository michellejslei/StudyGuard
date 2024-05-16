import React, { useState } from 'react';
import Background from '../components/Background';
import Footer from '../components/Footer';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-wave-pattern h-screen bg-cover bg-center flex flex-col z-0 w-full relative">
      {/* <Background /> */}
      <div class="text-center z-10 relative py-36">
          <h1 class="my-4 text-6xl text-white">StudyGuard</h1>
          <h1 class="text-3xl font-extrabold text-white">
            The study buddy you hate to love
          </h1>
          {isHovered ? (
            <img
              class="center"
              src="/public/IMG_0221.png" // Path to hover image
              alt="image description"
            />
          ) : (
            <img
              class="center"
              src="/public/IMG_0222.png"
              alt="image description"
            />
          )}
          <p class="my-4 text-4xl text-white"></p>
          <a
            href="/jobs.html"
            class="my-4 text-2xl bg-white text-purple-100 hover:bg-rose-400 hover:text-white rounded-md px-4 py-3"
            onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
            onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
          >
            Get started now
          </a>
          {/* Conditionally render image based on hover state */}

        </div>
        <Footer />
    </div>
  )
}

export default Home