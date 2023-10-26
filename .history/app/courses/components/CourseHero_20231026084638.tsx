// components/CourseHero.tsx

export default function CourseHero() {
    return (
      <div className="h-56 bg-red-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">AI for Business Growth</h1>
          <p className="text-xl mb-8">Harness the power of AI to drive your business forward</p>
          <div className="space-x-4">
            <a href="#signup" className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold">Sign Up</a>
            <a href="#learn-more" className="bg-transparent border border-blue-500 text-blue-500 px-8 py-3 rounded-full font-semibold">Learn More</a>
          </div>
        </div>
      </div>
    );
  }
  