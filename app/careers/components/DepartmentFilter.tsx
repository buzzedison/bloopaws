'use client';

import { useState } from 'react';

interface Career {
  department: string;
}

interface DepartmentFilterProps {
  careers: Career[];
}

export default function DepartmentFilter({ careers }: DepartmentFilterProps) {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Get unique departments using Array.from() instead of spread operator
  const departments = ['All', ...Array.from(new Set(careers.map(career => career.department)))];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Departments</h2>
      <div className="space-y-2">
        {departments.map((department) => (
          <button
            key={department}
            onClick={() => setSelectedDepartment(department)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedDepartment === department
                ? 'bg-red-50 text-red-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {department}
            <span className="float-right text-sm text-gray-400">
              {department === 'All'
                ? careers.length
                : careers.filter(c => c.department === department).length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}