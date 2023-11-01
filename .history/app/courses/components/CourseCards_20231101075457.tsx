// components/CourseCard.tsx
import Link from "next/link"
import Image from "next/image"
interface CourseCardProps {
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    link: string; 
}

export default function CourseCard({ title, subtitle, description, imageSrc, link }: CourseCardProps) {
    return (
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
            <div className="flex-grow">
                <Image src={imageSrc} width={300} height={200} alt={`${title} image`} className="w-full rounded-t-lg mb-4" />
                <h3 className="text-xl font-bold text-red-700">{title}</h3>
                <h4 className="text-gray-500 mt-2 font-bold ">{subtitle}</h4>
                <p className="text-gray-700 mt-2 flex-grow">{description}</p>
            </div>
            <Link href={link} className="text-red-800 mt-4 self-start">
            Learn More →</Link>
        </div>
    );
}
