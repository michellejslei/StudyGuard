import React, { useState } from 'react';

const App = () => {
  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <body>
      <nav class="bg-gradient-to-r from-purple-300 to-pink-300">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="flex h-20 items-center justify-left">
            <a class="flex space-x-2items-center" href="/index.html">
              {/* Your logo */}
            </a>
            <a
              href="/index.html"
              class="text-white text-xl hover:bg-rose-400 hover:text-white rounded-md px-3 py-2"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      <section class="bg-rose-300 py-20 mb-4">
        <div class="text-center">
          <h1 class="my-4 text-5xl text-white">StudyGuard</h1>
          <h1 class="text-2xl font-extrabold text-white">
            The Study Buddy You Hate to Love
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
            class="my-4 text-2xl text-white hover:bg-rose-400 hover:text-white rounded-md px-3 py-2"
            onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
            onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
          >
            Get Started Now
          </a>
          {/* Conditionally render image based on hover state */}

        </div>
      </section>
    </body>
  );
};

export default App;
