import Image from 'next/image';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] mb-16">
        <Image 
          src="/images/back.png" 
          fill={true}
          objectFit="cover"
          alt="About hero"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white">
          <h1 className="text-6xl font-bold">What We Do</h1>
          
          <p className="mt-4 text-xl max-w-3xl">
            We guide visionary startups by illuminating strategy, defining winning plans, markets, and roadmaps. We help build winning products every step of the way from brainstorming to launch.
          </p>
        </div>
      </div>

      {/* How We Do It Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">How We Do It</h2>
          
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="p-8 bg-white shadow rounded">
                <Image 
                  src="/images/lightbulb.svg"  
                  width={40}
                  height={40}
                  alt="Idea icon"
                />

                <h3 className="mt-4 text-xl font-bold">Big Ideas</h3>
                
                <p className="mt-2 text-gray-600">
                  We hunt big, world-changing ideas and help them take flight.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="p-8 bg-white shadow rounded">
                <Image 
                  src="/images/team.svg"
                  width={40} 
                  height={40}
                  alt="Team icon" 
                />

                <h3 className="mt-4 text-xl font-bold">Assemble the Team</h3>
                
                <p className="mt-2 text-gray-600">
                  We rally the right team to fuel the journey, raise funds, and make the vision take flight.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="p-8 bg-white shadow rounded">
                <Image 
                  src="/images/rocket.svg"  
                  width={40}
                  height={40}
                  alt="Rocket icon"
                />

                <h3 className="mt-4 text-xl font-bold">Fuel the Journey</h3>
                
                <p className="mt-2 text-gray-600">
                  We provide hands-on support to build, launch, and rapidly grow successful companies.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="p-8 bg-white shadow rounded">
                <Image 
                  src="/images/trophy.svg" 
                  width={40}
                  height={40}
                  alt="Trophy icon"
                />

                <h3 className="mt-4 text-xl font-bold">Drive Results</h3>
                
                <p className="mt-2 text-gray-600">
                  Our goal is to build businesses that can compete with the biggest names in the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Helping Brands Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Helping Brands</h2>
          
          <div className="max-w-lg mx-auto p-8 bg-white shadow rounded">
            <h3 className="text-2xl font-bold mb-4"># Idea To Company</h3>
            
            <p className="text-gray-600">
              At Bloop Global, we partner with top talent to invest in, build, and grow successful companies. Our mission is to tackle big problems, create products people love, and build businesses that compete globally.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;