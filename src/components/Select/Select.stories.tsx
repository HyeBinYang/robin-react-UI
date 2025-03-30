import React from "react";
import Flex from "../Flex";
import type { Meta, StoryObj } from "@storybook/react";
import Select from ".";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  decorators: [
    (Story) => (
      <Flex gap={8} style={{ height: "300px" }}>
        <Story />
      </Flex>
    ),
  ],
  argTypes: {
    options: {
      control: { type: "object" },
      description: "Select Option 리스트",
      table: {
        type: {
          summary: "{ label: string; value: string }[]",
          detail: "label: 화면에 보이는 옵션 텍스트 값\nvalue: 옵션의 실질적인 값",
        },
      },
    },
    label: {
      description: "Select에 대한 설명",
      type: "string",
    },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: "Select 크기",
    },
    width: {
      description: "Select Control 너비 값",
      type: "number",
    },
    isFullWidth: {
      control: {
        type: "boolean",
      },
      description: "container 너비를 꽉 채울지 여부",
    },
    helperText: {
      control: { type: "text" },
      description: "Select에 대해 부가설명이 필요할 때 사용하는 텍스트",
    },
    error: {
      control: "boolean",
      description: "에러 발생 여부",
    },
    disabled: {
      control: "boolean",
      description: "활성 여부",
    },
    onSelect: {
      description: "옵션 선택시 실행되는 이벤트 헨들러",
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Example: Story = {
  args: {
    options: [
      {
        label: "label 1",
        value: "value 1",
      },
      {
        label: "label 2",
        value: "value 2",
      },
      {
        label: "label 3",
        value: "value 3",
      },
      {
        label: "label 4",
        value: "value 4",
      },
      {
        label: "label 5",
        value: "value 5",
      },
      {
        label: "label 6",
        value: "value 6",
      },
    ],
    label: "Label",
    size: "large",
    width: 120,
    isFullWidth: false,
    helperText: "옵션을 선택해주세요.",
    error: false,
    disabled: false,
    onSelect: action("선택한 옵션"),
  },
};
