// CoursePage.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function CoursePage() {
  const courses = [
    {
      title: 'Course Title 1',
      subtitle: 'Course Subtitle 1',
      description: 'Course Description 1',
      imageUrl: '/path/to/image1.jpg',
      learnMoreUrl: '/course/1',
    },
    // ... other courses
  ];

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white p-16 text-center">
        <h1 className="text-4xl mb-4">AI for Business Growth</h1>
        <p className="mb-8">Unlock the potential of AI to drive business growth.</p>
        <div>
          <Link href="/sign-up">
            <a className="bg-red-500 text-white py-2 px-6 rounded-full mr-4">Sign Up</a>
          </Link>
          <Link href="/learn-more">
            <a className="bg-white text-blue-600 py-2 px-6 rounded-full">Learn More</a>
          </Link>
        </div>
      </div>
      
      {/* Course Introduction Section */}
      <div className="text-center py-16">
        <h2 className="text-3xl mb-4">Explore Our Courses</h2>
        <p className="mb-12">Dive into our extensive range of courses tailored to empower you in the digital realm.</p>
      </div>
      
      {/* Courses Grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 p-8">
        {courses.map((course, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <Image src={course.imageUrl} alt={course.title} width={300} height={200} objectFit="cover" />
            </div>
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <h4 className="text-lg mb-4">{course.subtitle}</h4>
            <p className="mb-6">{course.description}</p>
            <Link href={course.learnMoreUrl}>
              <a className="text-blue-500 underline">Learn More</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
