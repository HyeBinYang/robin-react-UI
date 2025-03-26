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
  argTypes: {},
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    label: "qweqweqweqweqweqw",
    width: 200,
  },
};
