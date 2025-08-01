// components/CourseCard.tsx

interface CourseCardProps {
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
  }
  
  export default function CourseCard({ title, subtitle, description, imageSrc }: CourseCardProps) {
    return (
        <div className="bg-red-200">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img src={imageSrc} alt={`${title} image`} className="w-full rounded-t-lg" />
        <h3 className="text-xl font-bold mt-4">{title}</h3>
        <h4 className="text-gray-500 mt-2">{subtitle}</h4>
        <p className="text-gray-700 mt-2">{description}</p>
        <a href="#learn-more" className="text-blue-500 mt-4 inline-block">Learn More →</a>
      </div>
      </div>
    );
  }
  