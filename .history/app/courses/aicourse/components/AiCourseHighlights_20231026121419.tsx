// components/AICourseHighlights.tsx

export default function AICourseHighlights() {
    return (
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Course Highlights</h2>
          <ul className="list-disc list-inside text-lg mb-8">
            {/* Add the highlights here */}
            <li>Intro to major AI models</li>
            <li>Ethical AI use</li>
            {/* ... */}
          </ul>
          <a href="#enroll" className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold">Enroll Now</a>
        </div>
      </div>
    );
  }
  