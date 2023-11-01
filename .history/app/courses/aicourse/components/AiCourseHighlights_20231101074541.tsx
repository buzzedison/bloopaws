// components/AICourseHighlights.tsx
import Link from "next/link";
export default function AICourseHighlights() {
    return (
      <div className="py-16 bg-red-100">
        <div className="container mx-auto ml-0 md:ml-12">
          <h2 className="text-2xl font-bold mb-4">Course Highlights</h2>
          <ul className="list-disc list-inside text-lg mb-8">
            {/* Add the highlights here */}
            <li>Intro to major AI models</li>
            <li>How to use AI to enhance your business</li>
            <li>Learn how to build websites in minutes with AI</li>
            <li> Learn how to never do product photoshoots again</li>
            <li> Learn how to use AI for almost everything in your business</li>
            <li>Fun and interactive elements</li>

 
          </ul>
          <Link href="https://bloopglobal.ck.page/f1460a0d63" className="bg-red-800 text-white px-8 py-3 rounded-full font-semibold">Enroll Now</Link>
        </div>
      </div>
    );
  }
  