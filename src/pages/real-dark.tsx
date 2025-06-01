import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FlashLightOverlay, Layout } from "../components";

const RealDarkPage = () => {
  const [isDark, setIsDark] = useState(false);

  const toggle = () => {
    setIsDark(!isDark);
  };

  return (
    <Layout>
      <button
        aria-label="Toggle dark mode"
        css={css`
          position: fixed;
          top: 0;
          right: 0;
          z-index: 10000;
          font-size: 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
          &:hover {
            transform: scale(1.2);
          }
        `}
        onClick={toggle}
      >
        {isDark ? "🌞" : "🌙"}
      </button>
      <main
        css={css`
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        `}
      >
        <Title>Lorem Ipsum</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium, massa vitae
          venenatis aliquam, metus nisl bibendum orci, non ultrices ex est et lectus. Vivamus risus
          ante, pellentesque nec tellus vitae, lacinia aliquet leo. Nam eu nibh in nisl lobortis
          efficitur vel ut lorem. Praesent congue mauris id turpis fringilla, vitae interdum diam
          commodo. Mauris dui libero, posuere non urna non, aliquet sodales nisl. Duis tincidunt
          nisl nisi, ac auctor tortor finibus nec. Nam ac orci dignissim, tempor sem sed, luctus
          elit. Nullam sodales vestibulum tellus, placerat aliquam nulla dignissim ullamcorper. Duis
          porttitor at urna id congue. Mauris porta erat vitae sapien efficitur, in mollis magna
          fermentum. Cras porta mi leo, sit amet bibendum massa vulputate ut. Etiam tristique
          malesuada turpis, ac sagittis neque mollis a. Sed neque elit, accumsan vitae ultrices et,
          venenatis in arcu. Sed et lectus in sapien laoreet suscipit at eu erat.
        </Paragraph>
        <Paragraph>
          Aliquam dignissim nulla ac condimentum molestie. Donec eu dignissim ligula. Mauris eget
          vestibulum erat, non ultricies tellus. Nunc ultrices, urna sit amet viverra laoreet, sem
          arcu facilisis ante, eget facilisis est risus eget massa. Donec euismod lobortis
          fermentum. Phasellus vulputate sem libero, eget sodales felis egestas ut. Duis molestie
          massa vitae purus blandit congue. Sed pellentesque, mi consequat imperdiet facilisis,
          dolor augue aliquam arcu, quis aliquam ex mi sed nulla. Cras hendrerit est est, ac
          hendrerit odio facilisis venenatis. Aenean sit amet semper leo, sed lobortis urna.
        </Paragraph>
        <Paragraph>
          Nam ullamcorper faucibus erat, ac venenatis nisi gravida id. Aenean molestie volutpat
          purus, ut faucibus massa ultricies eu. In suscipit felis velit. Integer egestas lacus quis
          sem dictum, sed egestas felis hendrerit. Aliquam condimentum urna eu dolor lobortis, ut
          dapibus nisl sollicitudin. Suspendisse sagittis, nunc interdum laoreet finibus, sapien
          nisi fermentum metus, nec sodales nisi lectus ac felis. Cras vel laoreet massa. Aliquam
          dictum quam egestas sem pretium euismod. Maecenas dictum nibh nec metus gravida fermentum.
          Praesent pellentesque orci et nunc egestas, vel molestie est sodales. Sed lobortis dui
          quis pulvinar cursus. Mauris vitae finibus lacus.
        </Paragraph>
        {isDark && <FlashLightOverlay />}
      </main>
    </Layout>
  );
};

export default RealDarkPage;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 2.3rem;
  margin-bottom: 3.2rem;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
`;
