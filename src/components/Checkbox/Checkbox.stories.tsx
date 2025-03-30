import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Checkbox from ".";
import color from "../../constant/color";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: "Checkbox 크기",
    },
    color: {
      control: "select",
      options: Object.keys(color),
      description: "Checkbox 체크시 아이콘 Color",
    },
    id: {
      control: "text",
      description: "`input` 태그와 연결하기위한 속성 값",
    },
    label: {
      control: "text",
      description: "체크박스 label",
    },
    checked: {
      control: "boolean",
      description: "체크 여부",
    },
    onChange: {
      type: "function",
      description: "Toggle시 트리거되는 이벤트 헨들러",
    },
  },
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Example: Story = {
  args: {
    size: "large",
    color: "Blue400",
    // id: "Test",
    label: "Test Label",
    onChange: action("Trigger onChange"),
  },
};
