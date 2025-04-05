import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Chip from ".";
import color from "../../constant/color";
import { DEFAULT_COLOR } from "../../constant/common";

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
        Text: <p>kg</p>,
        Icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L14.09 8.26L21 9.27L15.45 13.97L16.82 21L12 17.27L7.18 21L8.55 13.97L3 9.27L9.91 8.26L12 2Z"
              fill="gold"
              stroke="black"
              stroke-width="1"
            />
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
        Text: <p>kg</p>,
        Icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L14.09 8.26L21 9.27L15.45 13.97L16.82 21L12 17.27L7.18 21L8.55 13.97L3 9.27L9.91 8.26L12 2Z"
              fill="gold"
              stroke="black"
              stroke-width="1"
            />
          </svg>
        ),
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
    variant: "filled",
    size: "medium",
    backgroundColor: DEFAULT_COLOR,
    labelColor: "White",
    deleteIcon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
      </svg>
    ),
    onClick: action("Click Chip"),
    onDelete: action("Delete Chip"),
  },
};
