import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

const HomePage = () => {
  const data = useStaticQuery(graphql`
    query {
      allPostsJson {
        nodes {
          title
          slug
          content
        }
      }
    }
  `);

  return (
    <main>
      <h1 css={{ color: "red" }}>HomePage</h1>
      {/* <Link></Link> */}
    </main>
  );
};

export default HomePage;
