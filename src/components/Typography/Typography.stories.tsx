import React from "react";
import Flex from "../Flex";
import type { Meta, StoryObj } from "@storybook/react";
import Select from ".";
import Typography from ".";
import colors from "../../constant/color";
import typography from "../../constant/typography";

const meta: Meta<typeof Select> = {
  title: "Components/Typography",
  component: Typography,
  decorators: [
    (Story) => (
      <Flex gap={8}>
        <Story />
      </Flex>
    ),
  ],
  argTypes: {
    font: {
      control: "select",
      options: Object.keys(typography),
      description: "텍스트 폰트",
    },
    color: {
      control: "select",
      options: Object.keys(colors),
      description: "텍스트 색깔",
    },
    children: {
      control: "text",
      description: "텍스트",
    },
    as: {
      control: "text",
      description: "태그 (HTML Element)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Test: Story = {
  args: {
    as: "h1",
    children: "Typography",
    font: "Body1Regular",
    color: "Blue400",
  },
};
