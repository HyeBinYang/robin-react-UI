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
    size: {
      control: "select",
      options: ["normal", "small"],
      description: "TextField 크기",
    },
    label: {
      control: "text",
      description: "입력에 대해 알려주는 text",
    },
    placeholder: {
      control: "text",
      description: "label 없을 때 대체",
    },
    helperText: {
      control: "text",
      description: "좀 더 길고 상세한 설명이 필요한 경우",
    },
    required: {
      control: "boolean",
      description: "필수 입력 유무 표시",
    },
    left: {
      control: "select",
      options: ["None", "Text", "Icon"],
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
      description: "아이콘 or 단위 (왼쪽)",
    },
    right: {
      control: "select",
      options: ["None", "Text", "Icon"],
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
      description: "아이콘 or 단위 (오른쪽)",
    },
    multiline: {
      control: "boolean",
      description: "여러 줄 입력",
    },
    maxRows: {
      control: "number",
      description: "`multiline === true`시 최대 줄 높이 값",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Example: Story = {
  args: {
    type: "text",
    variant: "outlined",
    size: "normal",
    label: "Filled",
    placeholder: "Placeholder",
    helperText: "Helper text",
    required: true,
    left: undefined,
    right: undefined,
    multiline: true,
  },
};
