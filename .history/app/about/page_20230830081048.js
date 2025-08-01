import Image from 'next/image';

const About = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      {/* Hero Image */}
      <div className="relative h-[500px] mb-16">
        <Image
          fill={true}
          objectFit="cover"
          src="/images/aboutbloop.png"/>
          alt="About Us"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white">About Us</h1>
        </div>
      </div>
      
      {/* What We Do Section */}
      <section className="my-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              We guide visionary startups. Illuminating strategy, defining winning plans, markets, and roadmaps.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Help them build winning products every step of the way from brainstorming to launch.
            </p>
            <p className="text-lg leading-relaxed">
              Activating connections and introducing startups to the collaborations and resources that launch their big ideas.
            </p>
          </div>
          <div>
            <Image
              src="/images/aboutbloop.png"
              width={600}
              height={480}
              alt="What We Do"
            />
          </div>
        </div>
      </section>

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
  );
};

export default About;
