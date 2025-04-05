import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Slider from ".";
import color from "../../constant/color";
import { action } from "@storybook/addon-actions";
import Flex from "../../layouts/Flex";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  decorators: [
    (Story) => (
      <Flex
        alignItems="center"
        justifyContent="center"
        style={{
          width: "300px",
          height: "300px",
        }}
      >
        <Story />
      </Flex>
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
    valueLabelDisplay: {
      control: "select",
      options: ["auto", "on", "off"],
      description: "`value label` 표시 방법",
    },
    disabled: {
      control: "boolean",
      description: "활성화 유무",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "`Slider` 방향",
    },
    onChange: {
      type: "function",
      description: "value값이 변경될 때 실행되는 함수",
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
    max: 100,
    step: 1,
    defaultValue: 0,
    showMarks: false,
    valueLabelDisplay: "auto",
    disabled: false,
    orientation: "horizontal",
    onChange: action("Value: "),
  },
};
