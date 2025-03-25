import React from "react";
import Flex from "../Flex";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Checkbox from ".";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  decorators: [
    (Story) => (
      <Flex gap={8}>
        <Story />
      </Flex>
    ),
  ],
  argTypes: {
    htmlFor: {
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
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    htmlFor: "Test",
    label: "Test Label",
    onChange: action("Trigger onChange"),
  },
};
