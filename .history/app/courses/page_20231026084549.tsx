// pages/CoursePage.tsx

import CourseHero from './components/CourseHero';
import CoursesIntro from './components/CourseIntro';
import CourseCard from './components/CourseCards';

export default function CoursePage() {
  const courses = [
    { title: 'Course One', subtitle: 'Subtitle One', description: 'Description One', imageSrc: '/path/to/image1.jpg' },
    { title: 'Course Two', subtitle: 'Subtitle Two', description: 'Description Two', imageSrc: '/path/to/image2.jpg' },
    { title: 'Course Three', subtitle: 'Subtitle Three', description: 'Description Three', imageSrc: '/path/to/image3.jpg' },
  ];

  return (
    <>
      <CourseHero />
      <CoursesIntro />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </>
  );
}
