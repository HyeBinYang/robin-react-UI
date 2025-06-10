import React, { useRef, useState } from "react";
import { Paper, Layout } from "../components";
import { css } from "@emotion/react";

const ButtonCSS = css`
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease 0s;

  &:hover {
    background-color: #23c483;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

const StackedPaperPage = () => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [step, setStep] = useState(1);
  const paperCount = 100;

  return (
    <Layout>
      <main>
        <div
          css={css`
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem 0;
          `}
        >
          <div
            css={css`
              position: relative;
            `}
          >
            {Array.from({ length: paperCount }, () => 0).map((_, index) => (
              <div
                key={index}
                className={step >= index + 1 ? "active" : ""}
                css={css`
                  position: absolute;
                  transform: ${step > index + 1
                      ? `scale(${1 - (step - (index + 1)) * 0.05}) translateY(${
                          28 * (step - (index + 1))
                        }px)`
                      : ""}
                    translateX(${step >= index + 1 ? 0 : "100%"});
                  opacity: ${step >= index + 1 ? 1 : 0};
                  pointer-events: ${step >= index + 1 ? "auto" : "none"};
                  transition: all 0.3s ease-out;
                `}
                style={{ "--i": index } as React.CSSProperties}
              >
                <Paper />
              </div>
            ))}
          </div>
          <div
            css={css`
              position: fixed;
              bottom: 20px;
              right: 20px;
            `}
          >
            <input
              css={css`
                background-color: #f3f3f3;
                border: none;
                padding: 1rem;
                margin-bottom: 1.2rem;
                font-size: 1rem;
                width: 11em;
                border-radius: 1rem;
                color: lightcoral;
                box-shadow: 0 0.4rem #dfd9d9;
                outline: none;
              `}
              type="tel"
              placeholder="Input Paper Count..."
            />
            <div
              css={css`
                display: flex;
                gap: 8px;
              `}
            >
              <button type="button" css={ButtonCSS} onClick={() => setStep(step - 1)}>
                Clear
              </button>
              <button type="button" css={ButtonCSS} onClick={() => setStep(step - 1)}>
                Pop
              </button>
              <button
                type="button"
                css={ButtonCSS}
                onClick={() => {
                  if (interval.current) {
                    clearInterval(interval.current);
                  }

                  let count = 0;
                  interval.current = setInterval(() => {
                    setStep((prev) => {
                      if (interval.current && (++count === 10 || prev === paperCount)) {
                        clearInterval(interval.current);
                      }
                      return prev + 1;
                    });
                  }, 80);
                }}
              >
                Push
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default StackedPaperPage;
