// page.js
"use client"

import { useEffect, useState } from 'react';
import NavBarNew from './components/NavbarNew';
import Categories from './components/Categories';
import LoadMore from './components/LoadMore';
import ProjectCard from './components/ProjectCard';
import { fetchAllProjects } from '../../lib/actions';

const Home = ({ searchParams }) => {
  const { category, endcursor } = searchParams;
  const [projectsToDisplay, setProjectsToDisplay] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllProjects(category, endcursor);
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
