// components/CourseCard.tsx
import Link from "next/link"
import Image from "next/image"

interface CourseCardProps {
    title: string;
    description: string;
    imageSrc: string;
}

export default function CourseCard({ title, description, imageSrc }: CourseCardProps) {
    // Shortening the description to a maximum of 100 characters
    const shortDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

    return (
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
            <div className="flex-grow">
                <Image src={imageSrc} width={300} height={200} alt={`${title} image`} className="w-full rounded-t-lg mb-4" />
                <h3 className="text-xl font-bold text-red-700">{title}</h3>
                <p className="text-gray-700 mt-2 flex-grow">{shortDescription}</p>
            </div>
            <Link href="#learn-more"className="text-red-800 mt-4 self-start">Learn More →
            </Link>
        </div>
    );
}
