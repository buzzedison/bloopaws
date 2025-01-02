'use client';

import Link from 'next/link';
import { Briefcase, MapPin, Clock } from 'lucide-react';

interface Career {
  _id: string;
  title: string;
  slug: { current: string };
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
}

interface CareersListProps {
  careers: Career[];
}

export default function CareersList({ careers }: CareersListProps) {
  return (
    <div className="grid gap-4">
      {careers.map((career) => (
        <Link 
          key={career._id}
          href={`/careers/${career.slug.current}`}
          className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-red-200 hover:shadow-md transition-all duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {career.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {career.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {career.type}
                </div>
              </div>
              <p className="text-gray-600 line-clamp-2">{career.summary}</p>
            </div>
            {career.salary && (
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                <div className="text-right">
                  <span className="text-lg font-medium text-gray-900">
                    {career.salary.currency} {career.salary.min.toLocaleString()} - {career.salary.max.toLocaleString()}
                  </span>
                  <span className="block text-sm text-gray-500">
                    per {career.salary.period}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
} 