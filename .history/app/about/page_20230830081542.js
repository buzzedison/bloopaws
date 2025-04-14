import Image from 'next/image';

const About = () => {
  return (
    <div className="">
      {/* Hero Image with About Bloop and What We Do Section */}
      <div className="relative h-[600px] mb-16">
        <Image
       fill={true}
          objectFit="cover"
          src="/images/aboutbloop.png"
          alt="About Us"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-extrabold text-white mb-4">About Bloop</h1>
          <p className="text-lg leading-relaxed text-white max-w-2xl text-center">
            We guide visionary startups. Illuminating strategy, defining winning plans, markets, and roadmaps. Help them build winning products every step of the way from brainstorming to launch.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
      
      {/* How We Do It Section */}
      <section className="my-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">How We Do It</h2>
        <p className="text-lg leading-relaxed">
          We hunt big ideas and help them soar. We relentlessly search for innovations that solve major problems and create vast opportunities. We then rally the team to fuel their journey, raise the funds, and make their vision take flight.
        </p>
      </section>

      {/* Helping Brands Section */}
      <section className="my-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Helping Brands</h2>
        <h3 className="text-3xl font-bold mb-4"># Idea To Company: Turning Ideas into Successful Businesses</h3>
        <p className="text-lg leading-relaxed">
          At Bloop Global, we partner with top talent to invest in, build, and grow successful companies. Our mission is to tackle big societal problems, create products that people love, and build businesses that can compete with the biggest names in the world.
        </p>
      </section>
    </div>

    </div>
  );
};

export default About;
