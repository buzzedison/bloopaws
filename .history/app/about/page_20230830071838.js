import Image from 'next/image';

const About = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      
      {/* What We Do Section */}
      <section className="my-16">
        <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
        <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <p className="text-lg mb-6">
              We guide visionary startups. Illuminating strategy, defining winning plans, markets, and roadmaps.
            </p>
            <p className="text-lg mb-6">
              Help them build winning products every step of the way from brainstorming to launch.
            </p>
            <p className="text-lg">
              Activating connections and introducing startups to the collaborations and resources that launch their big ideas.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/images/aboutbloop.png"
              width={500}
              height={400}
              alt="What We Do"
            />
          </div>
        </div>
      </section>

      {/* How We Do It Section */}
      <section className="my-16">
        <h2 className="text-3xl font-semibold mb-4">How We Do It</h2>
        <p className="text-lg mb-6">
          We hunt big ideas and help them soar. We relentlessly search for innovations that solve major problems and create vast opportunities. We then rally the team to fuel their journey, raise the funds, and make their vision take flight.
        </p>
      </section>

      {/* Helping Brands Section */}
      <section className="my-16">
        <h2 className="text-3xl font-semibold mb-4">Helping Brands</h2>
        <h3 className="text-2xl font-bold mb-4"># Idea To Company: Turning Ideas into Successful Businesses</h3>
        <p className="text-lg">
          At Bloop Global, we partner with top talent to invest in, build, and grow successful companies. Our mission is to tackle big societal problems, create products that people love, and build businesses that can compete with the biggest names in the world.
        </p>
      </section>
    </div>
  );
};

export default About;

