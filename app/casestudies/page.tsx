import React from 'react';
import { cachedClient } from "../../sanity/lib/client";
import { caseStudiesQuery } from "../../sanity/lib/caseStudyQueries";
import CaseStudiesClient from './CaseStudiesClient';

export default async function CaseStudiesPage() {
  const caseStudies = await cachedClient(caseStudiesQuery);

  return <CaseStudiesClient caseStudies={caseStudies} />;
}