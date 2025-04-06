import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Chip from ".";
import color from "../../constant/color";
import Avatar from "../Avatar";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  argTypes: {
    label: {
      control: "text",
      description: "`Chip` 내부 텍스트",
    },
    variant: {
      control: "select",
      options: ["filled", "outlined"],
      description: "`Chip` 모양",
    },
    size: {
      control: "select",
      options: ["medium", "small"],
      description: "`Chip` 크기",
    },
    backgroundColor: {
      control: "select",
      options: Object.keys(color),
      description: "`Chip` 배경 color",
    },
    labelColor: {
      control: "select",
      options: Object.keys(color),
      description: "`Chip` 텍스트 color",
    },
    deleteIcon: {
      control: "select",
      options: ["None", "Icon 1", "Icon 2"],
      mapping: {
        None: undefined,
        "Icon 1": (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ),
        "Icon 2": (
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" />
            <line x1="8" y1="8" x2="16" y2="16" stroke={color["Blue400"]} strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="8" x2="8" y2="16" stroke={color["Blue400"]} strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
      },
      description: "`Chip` 커스텀 삭제 아이콘 버튼",
    },
    icon: {
      control: "select",
      options: ["None", "Icon 1", "Icon 2"],
      mapping: {
        None: undefined,
        "Icon 1": (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" fill="currentColor" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
          </svg>
        ),
        "Icon 2": <Avatar src="https://picsum.photos/200" alt="photo" />,
      },
      description: "`Chip` 왼쪽 커스텀 아이콘",
    },
    onClick: {
      type: "function",
      description: "`Chip` 클릭시 실행하는 함수",
    },
    onDelete: {
      type: "function",
      description: "`Chip` 삭제버튼 클릭시 실행하는 함수",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Example: Story = {
  args: {
    label: "Chip",
    onDelete: action("Delete Chip"),
  },
};

export const Clickable: Story = {
  args: {
    label: "Chip",
    onClick: action("Click Chip"),
  },
};
