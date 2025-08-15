"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowRight, DollarSign } from "lucide-react";

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

interface ModernCareerCardProps {
  career: Career;
  index: number;
}

export default function ModernCareerCard({ career, index }: ModernCareerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link 
        href={`/careers/${career.slug.current}`}
        className="group block"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-200/50 p-8 hover:shadow-xl hover:shadow-red-100/50 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 via-red-50/30 to-red-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            {/* Header with title and experience level */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black group-hover:text-red-600 transition-colors duration-300 mb-2 leading-tight">
                  {career.title}
                </h3>
                
                {/* Department badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600 mb-4">
                  {career.department}
                </div>
              </div>
              
              {/* Experience level */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200">
                  {career.experience} level
                </span>
              </div>
            </div>

            {/* Job details */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-medium">{career.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-medium">{career.type}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-medium">{career.department}</span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-gray-700 leading-relaxed mb-6 text-base">
              {career.summary.length > 200 
                ? career.summary.substring(0, 200) + "..." 
                : career.summary
              }
            </p>

            {/* Bottom section with salary and CTA */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              {/* Salary */}
              {career.salary && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      {career.salary.currency} {career.salary.min.toLocaleString()} - {career.salary.max.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      per {career.salary.period}
                    </span>
                  </div>
                </div>
              )}

              {/* Apply button */}
              <div className="flex items-center text-red-600 font-semibold group-hover:text-red-700 transition-colors duration-300">
                <span className="mr-2">View Details</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
