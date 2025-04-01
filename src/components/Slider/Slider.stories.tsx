import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Slider from ".";

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
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Example: Story = {
  args: {
    defaultValue: 0,
    step: 5,
  },
};
