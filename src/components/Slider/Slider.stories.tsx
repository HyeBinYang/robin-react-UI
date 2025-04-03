import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Slider from ".";
import color from "../../constant/color";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: {
      control: "select",
      options: Object.keys(color),
      description: "color",
    },
    size: {
      control: "select",
      options: ["medium", "small"],
      description: "크기",
    },
    min: {
      control: "number",
      description: "범위의 최솟값",
    },
    max: {
      control: "number",
      description: "범위의 최댓값",
    },
    step: {
      control: "number",
      description: "범위의 최솟값",
    },
    defaultValue: {
      control: "number",
      description: "초기값",
    },
    showMarks: {
      control: "boolean",
      description: "`mark` 표시 유무",
    },
    disabled: {
      control: "boolean",
      description: "활성화 유무",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Example: Story = {
  args: {
    color: "Blue400",
    size: "medium",
    min: 0,
    max: 49,
    step: 5,
    defaultValue: 13,
    showMarks: false,
    disabled: false,
  },
};
