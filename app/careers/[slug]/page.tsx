import type { Metadata } from 'next/types';
import { groq } from 'next-sanity';
import { client } from '../../../sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { Briefcase, MapPin, Clock, GraduationCap } from 'lucide-react';
import Link from 'next/link';

interface CareerPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const career = await client.fetch(
    groq`*[_type == "career" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  return {
    title: `${career.title} | Careers at Bloop Global`,
    description: career.summary,
  };
}

export default async function CareerPage({ params }: CareerPageProps) {
  const career = await client.fetch(
    groq`*[_type == "career" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
            {career.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-5 h-5 mr-2" />
              <span>{career.department}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{career.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{career.type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <GraduationCap className="w-5 h-5 mr-2" />
              <span>{career.experience}</span>
            </div>
          </div>

          {career.salary && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <div className="text-lg font-medium text-gray-900">
                {career.salary.currency} {career.salary.min.toLocaleString()} - {career.salary.max.toLocaleString()}
                <span className="text-sm text-gray-500 ml-1">
                   {career.salary.period}
                </span>
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">About the Role</h2>
            <div className="text-gray-600 mb-8">
              <PortableText value={career.description} />
            </div>

            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2 mb-8">
              {career.requirements.map((requirement: string, index: number) => (
                <li key={index} className="text-gray-600">{requirement}</li>
              ))}
            </ul>

            {career.benefits && career.benefits.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                  {career.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="mt-8 border-t pt-8">
            <Link
              href={career.applicationUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Apply for this position
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
} 