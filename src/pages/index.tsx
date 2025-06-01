import React from "react";
import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import { Layout, PageListCard } from "../components";
import { PageData } from "../types/page";

type HomePageQueryData = {
  allHomepagesJson: { nodes: PageData[] };
};

const HomePage = () => {
  const {
    allHomepagesJson: { nodes: pages },
  } = useStaticQuery<HomePageQueryData>(graphql`
    query {
      allHomepagesJson {
        nodes {
          title
          thumbnail
          preview
          src
        }
      }
    }
  `);

  return (
    <Layout>
      <main>
        <h1
          css={css`
            font-size: 3rem;
            font-weight: 700;
          `}
        >
          Universe
        </h1>
        <ul css={css``}>
          {pages.map((page) => (
            <PageListCard key={page.title} {...page} />
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default HomePage;
