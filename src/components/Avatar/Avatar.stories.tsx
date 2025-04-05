import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Avatar from ".";
import color from "../../constant/color";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    variant: {
      control: "select",
      options: ["circular", "square", "rounded"],
      description: "`Avatar` 모양",
    },
    src: {
      control: "text",
      description: "이미지 경로",
    },
    alt: {
      control: "text",
      description: "이미지 alt",
    },
    width: {
      control: "number",
      description: "`Avatar` 너비",
    },
    height: {
      control: "number",
      description: "`Avatar` 높이",
    },
    background: {
      control: "select",
      options: Object.keys(color),
      description: "`Avatar` 배경색",
    },
    textColor: {
      control: "select",
      options: Object.keys(color),
      description: "`Avatar` 텍스트 색",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Example: Story = {
  args: {
    src: "https://picsum.photos/200/300.jpg",
    alt: "TestImage",
  },
};
