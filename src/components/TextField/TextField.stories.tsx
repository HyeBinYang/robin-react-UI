import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TextField from ".";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "standard"],
      description: "input UI 종류",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Example: Story = {
  args: {
    variant: "filled",
    label: "Filled",
    placeholder: "Placeholder",
  },
};
