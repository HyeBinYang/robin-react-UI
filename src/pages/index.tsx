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
      <main
        css={css`
          min-height: 100dvh;
          background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
        `}
      >
        <div
          css={css`
            max-width: 640px;
            margin: 0 auto;
            padding: 64px 0 128px;
          `}
        >
          <h1
            css={css`
              margin-bottom: 64px;
              font-size: 3rem;
              font-weight: 700;
            `}
          >
            Universe
          </h1>
          <ul
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 32px;
            `}
          >
            {pages.map((page) => (
              <PageListCard key={page.title} {...page} />
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
