"use client"
import { useEffect, useState } from 'react';
import NavBarNew from './components/NavbarNew';
import Categories from '../showcase/components/Categories';
import LoadMore from '../showcase/components/LoadMore';
import ProjectCard from '../showcase/components/ProjectCard';
import { fetchAllProjects } from '../../lib/actions';
import { ProjectInterface } from '../../common.types';

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}

type Props = {
  searchParams: SearchParams;
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

const Home: React.FC<Props> = ({ searchParams: { category, endcursor } }) => {
  const [projectsToDisplay, setProjectsToDisplay] = useState<{ node: ProjectInterface }[]>([]);
  const [pageInfo, setPageInfo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
      setProjectsToDisplay(data?.projectSearch?.edges || []);
      setPageInfo(data?.projectSearch?.pageInfo || null);
    };

    fetchData();
  }, [category, endcursor]);

  if (projectsToDisplay.length === 0) {
    return (
      <>
        <NavBarNew />
        <section className="flexStart flex-col paddings">
          <Categories />
          <p className="no-result-text text-center">No projects found, go create some first.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <NavBarNew />
      <section className="flexStart flex-col paddings mb-16">
        <Categories />
        <section className="projects-grid">
          {projectsToDisplay.map(({ node }) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy.name}
              avatarUrl={node?.createdBy.avatarUrl}
              userId={node?.createdBy.id}
            />
          ))}
        </section>
        <LoadMore
          startCursor={pageInfo?.startCursor}
          endCursor={pageInfo?.endCursor}
          hasPreviousPage={pageInfo?.hasPreviousPage}
          hasNextPage={pageInfo?.hasNextPage}
        />
      </section>
    </>
  );
};

export default Home;
