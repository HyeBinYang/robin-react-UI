import React from "react";
import { css } from "@emotion/react";
import { Layout, PageListCard } from "../components";
import { StaticImage } from "gatsby-plugin-image";

const HomePage = () => {
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
            <PageListCard
              title="Real Dark Mode"
              src="real-dark"
              Thumbnail={
                <StaticImage
                  src={`../../static/images/thumbnail/real_dark_thumbnail.png`}
                  alt="Real Dark Mode"
                  objectFit="cover"
                  css={css`
                    width: 100%;
                    height: 280px;
                  `}
                  quality={100}
                />
              }
              Preview={
                <img
                  src={`/gifs/real_dark_preview.gif`}
                  alt="Real Dark Mode"
                  css={css`
                    width: 100%;
                    height: 280px;
                    object-fit: contain;
                    background-color: #000;
                  `}
                />
              }
            />
          </ul>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
