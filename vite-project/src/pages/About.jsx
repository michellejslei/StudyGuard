import React from 'react'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="bg-wave-pattern h-screen bg-cover bg-center flex flex-col z-0 w-full relative">
      <div className="text-center z-10 relative px-10 py-60 lg:max-w-4xl mx-auto">
        <h1 class="text-3xl font-extrabold text-white">
        Staying focused while studying alone can be hard, especially when there are so many distractions! 
        StudyGuard is an ML study buddy that will keep you focused the way your mom would have kept you accountable in high school!
        </h1>
      </div>
      <Footer />
    </div>
  )
}

export default About