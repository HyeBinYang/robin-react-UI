import React from "react";
import Flex from "../Flex";
import type { Meta, StoryObj } from "@storybook/react";
import Select from ".";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  decorators: [
    (Story) => (
      <Flex gap={8}>
        <Story />
      </Flex>
    ),
  ],
  argTypes: {
    label: {
      description: "Select에 대한 설명",
      type: "string",
    },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: "Select 크기",
    },
    width: {
      description: "Select Control 너비 값",
      type: "number",
    },
    options: {
      control: { type: "object" },
      description: "Select Option 리스트",
      table: {
        type: { summary: "{ label: string; value: string }[]" },
      },
    },
  },
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    size: "large",
    label: "Label",
    options: [
      {
        label: "label 1",
        value: "value 1",
      },
    ],
  },
};
