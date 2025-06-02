import React, { useState } from "react";
import { Paper, Layout } from "../components";
import { css } from "@emotion/react";

const StackedFormPage = () => {
  const [step, setStep] = useState(1);
  const paperCount = 100;
  let interval: NodeJS.Timeout | null = null;

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
                      ? `scale(${1 - (step - (index + 1)) * 0.045}) translateY(${
                          30 * (step - (index + 1))
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
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (interval) clearInterval(interval);
                let count = 0;
                interval = setInterval(() => {
                  setStep((prev) => {
                    if (interval && (++count === 10 || prev === paperCount)) {
                      clearInterval(interval);
                    }
                    return prev + 1;
                  });
                }, 500);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default StackedFormPage;
