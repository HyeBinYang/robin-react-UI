import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Avatar from ".";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Example: Story = {
  args: {
    children: "T",
    width: 24,
    height: 24,
    // src: "https://picsum.photos/200/300.jpg",
    // alt: "TestImage",
  },
};
