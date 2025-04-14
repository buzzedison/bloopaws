// pages/CoursePage.tsx

import CourseHero from './components/CourseHero';
import CoursesIntro from './components/CourseIntro';
import CourseCard from './components/CourseCards';

export default function CoursePage() {
  const courses = [
    { title: 'AI for Business Growth', 
    subtitle: 'The Complete Guide to Transforming Your Business with Generative AI', 
    description: 'We will guide you step-by-step to transform how you innovate, operate, and make decisions using AI. You will learn hands-on with tools like GPT and DALL-E 2 and other amazing tools from real-world case studies.', 
    imageSrc: '/images/aibusiness.png' },
    { title: 'Course Two', subtitle: 'Subtitle Two', description: 'Description Two', imageSrc: '/path/to/image2.jpg' },
    { title: 'Course Three', subtitle: 'Subtitle Three', description: 'Description Three', imageSrc: '/path/to/image3.jpg' },
  ];

  return (
    <>
       <div className="bg-red-100">
      <CourseHero />
      <CoursesIntro />
   
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        </div>
      </div>
    </>
  );
}
