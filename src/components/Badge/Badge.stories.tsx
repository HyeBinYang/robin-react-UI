import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Badge from ".";
import color from "../../constant/color";

const Rectangle = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "pink",
      }}
    ></div>
  );
};

const Circle = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "pink",
        borderRadius: "50%",
      }}
    ></div>
  );
};

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    children: {
      control: "select",
      options: ["Rectangle", "Circle"],
      mapping: {
        Rectangle: <Rectangle />,
        Circle: <Circle />,
      },
    },
    badgeContent: {
      control: "text",
      description: "`Badge`안에 들어갈 text",
    },
    color: {
      control: "select",
      options: Object.keys(color),
      description: "`Badge` 배경색",
    },
    position: {
      control: "select",
      options: ["topLeft", "topRight", "bottomLeft", "bottomRight"],
      description: "`Badge` 위치",
    },
    overlap: {
      control: "select",
      options: ["rectangular", "circular"],
      description: "`children`이 사각형, 원에 따른 위치 조정",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Example: Story = {
  args: {
    children: <Rectangle />,
    badgeContent: "99+",
  },
};
