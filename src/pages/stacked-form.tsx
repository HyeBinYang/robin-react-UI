import React, { useState } from "react";
import { FormPaper, Layout } from "../components";
import { css } from "@emotion/react";

const SHIFT_UNIT = 90;

const StackedFormPage = () => {
  const [step, setStep] = useState(1);

  const moveStep = (clickedStep: number) => () => {
    if (clickedStep > step) return;

    setStep(clickedStep);
  };

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

              &:hover {
                div {
                }
              }
            `}
          >
            <div
              className={step >= 1 ? "active" : ""}
              css={css`
                position: absolute;
                transform: ${step > 1
                  ? `scale(${1 - (step - 1) * 0.03}) translateY(${30 * (step - 1)}px)`
                  : ""};
                transition: all 0.3s ease-out;
              `}
              onClick={moveStep(1)}
            >
              <FormPaper>Step 1</FormPaper>
            </div>
            <div
              className={step >= 2 ? "active" : ""}
              css={css`
                position: absolute;
                transform: ${step > 2
                    ? `scale(${1 - (step - 2) * 0.03}) translateY(${30 * (step - 2)}px)`
                    : ""}
                  translateX(${step >= 2 ? 0 : "100%"});
                opacity: ${step >= 2 ? 1 : 0};
                visibility: ${step >= 2 ? "visible" : "hidden"};
                transition: all 0.3s ease-out;
              `}
              onClick={moveStep(2)}
            >
              <FormPaper>Step 2</FormPaper>
            </div>
            <div
              className={step >= 3 ? "active" : ""}
              css={css`
                position: absolute;
                transform: ${step > 2
                    ? `scale(${1 - (step - 3) * 0.03}) translateY(${30 * (step - 3)}px)`
                    : ""}
                  translateX(${step >= 3 ? 0 : "100%"});
                opacity: ${step >= 3 ? 1 : 0};
                visibility: ${step >= 3 ? "visible" : "hidden"};
                transition: all 0.3s ease-out;
              `}
              onClick={moveStep(3)}
            >
              <FormPaper>Step 3</FormPaper>
            </div>
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
            <button type="button" onClick={() => setStep(step + 1)}>
              Next
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default StackedFormPage;
