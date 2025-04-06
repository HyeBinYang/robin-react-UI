import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Flex from "@/layouts/Flex";
import Divider from ".";
import color from "@/constants/color";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "300px",
          height: "300px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    color: {
      control: "select",
      options: Object.keys(color),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Example: Story = {
  args: {},
};
