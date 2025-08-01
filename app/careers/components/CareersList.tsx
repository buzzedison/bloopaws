'use client';

import Link from 'next/link';
import { MapPin, Clock, ArrowRight, Briefcase } from 'lucide-react';

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
    <div className="grid gap-6">
      {careers.map((career) => (
        <Link 
          key={career._id}
          href={`/careers/${career.slug.current}`}
          className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 via-red-50/50 to-red-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
            <div className="flex-1 min-w-0">
              {/* Title and Experience Level */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                  {career.title}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600">
                  {career.experience}
                </span>
              </div>

              {/* Job Details */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {career.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {career.type}
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                  {career.department}
                </div>
              </div>

              {/* Summary */}
              <p className="text-gray-600 line-clamp-2 mb-4">
                {career.summary}
              </p>

              {/* View Role Button */}
              <div className="flex items-center text-red-600 font-medium group-hover:text-red-700 transition-colors duration-200">
                View Role
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>

            {/* Salary Information */}
            {career.salary && (
              <div className="sm:text-right">
                <div className="inline-block px-4 py-3 bg-gray-50 rounded-lg group-hover:bg-white transition-colors duration-200">
                  <span className="block text-lg font-semibold text-gray-900">
                    {career.salary.currency} {career.salary.min.toLocaleString()} - {career.salary.max.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {career.salary.period}
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