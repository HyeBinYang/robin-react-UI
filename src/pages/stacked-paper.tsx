import React, { useRef, useState } from "react";
import { Paper, Layout } from "../components";
import { css } from "@emotion/react";

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
              display: flex;
              justify-content: center;
            `}
          >
            <button type="button" onClick={() => setStep(step - 1)}>
              Clear
            </button>
            <button type="button" onClick={() => setStep(step - 1)}>
              Pop
            </button>
            <button
              type="button"
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
      </main>
    </Layout>
  );
};

export default StackedPaperPage;
