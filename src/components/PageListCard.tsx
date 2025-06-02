import React, { ReactNode, useState } from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

type Props = {
  title: string;
  src: string;
  Thumbnail: ReactNode;
  Preview: ReactNode;
};

const PageListCard = ({ src, Thumbnail, Preview }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      css={css`
        width: 100%;
        height: 320px;
        overflow: hidden;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: transform 0.2s ease;
        &:hover {
          transform: scale(1.03);
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={src}
        css={css`
          display: block;
          background-color: #262626;
        `}
      >
        <div
          css={css`
            height: 40px;
            padding: 0 12px;
            display: flex;
            align-items: center;
            gap: 16px;
          `}
        >
          <div
            css={css`
              height: 100%;
              display: flex;
              align-items: center;
              gap: 6px;
            `}
          >
            <Circle />
            <Circle />
            <Circle />
          </div>
          <div
            css={css`
              height: 20px;
              line-height: 20px;
              padding-left: 10px;
              flex: 1;
              border: 2px solid #fff;
              border-radius: 8px;
              color: #fff;
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7.89"
              height="7.887"
              viewBox="0 0 16.89 16.887"
            >
              <path
                id="Fill"
                d="M16.006,16.887h0l-4.743-4.718a6.875,6.875,0,1,1,.906-.906l4.719,4.744-.88.88ZM6.887,1.262a5.625,5.625,0,1,0,5.625,5.625A5.631,5.631,0,0,0,6.887,1.262Z"
                transform="translate(0.003 0)"
                fill="currentColor"
              ></path>
            </svg>
            <strong
              css={css`
                margin-left: 8px;
                font-size: 0.8em;
              `}
            >
              {src}
            </strong>
          </div>
        </div>
        {isHovered ? Preview : Thumbnail}
      </Link>
    </li>
  );
};

export default PageListCard;

const Circle = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  &:first-of-type {
    background-color: #ff5f56;
  }

  &:nth-of-type(2) {
    background-color: #ffbd2e;
  }

  &:last-of-type {
    background-color: #27c93f;
  }
`;
