import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Switch from ".";
import { action } from "@storybook/addon-actions";
import color from "../../constant/color";
import Flex from "../Flex";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    label: {
      control: "text",
      description: "Switch에 대한 설명",
    },
    color: {
      control: "select",
      options: Object.keys(color),
      description: "Switch 체크시 색상",
    },
    size: {
      control: "select",
      options: ["medium", "small"],
      description: "Switch 크기",
    },
    checked: {
      control: "boolean",
      type: "boolean",
      description: "체크 여부",
    },
    disabled: {
      control: "boolean",
      type: "boolean",
      description: "활성화 여부",
    },
    required: {
      control: "boolean",
      type: "boolean",
      description: "필수 입력 유무 표시",
    },
    onToggle: {
      type: "function",
      description: "클릭시 실행되는 이벤트 헨들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Example: Story = {
  args: {
    label: "Label",
    color: "Amber500",
    size: "medium",
    checked: false,
    disabled: false,
    required: false,
    onToggle: action("Toggle"),
  },
};
