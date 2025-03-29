import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Radio from ".";
import Flex from "../Flex";
import color from "../../constant/color";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  argTypes: {
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: "Radio 크기",
    },
    color: {
      control: "select",
      options: Object.keys(color),
      description: "Radio 체크시 아이콘 Color",
    },
    label: {
      control: "text",
      description: "Radio label",
    },
    checked: {
      control: "boolean",
      description: "체크 여부",
    },
    disabled: {
      control: "boolean",
      description: "활성화 여부",
    },
    onChange: {
      type: "function",
      description: "클릭시 실행되는 이벤트 헨들러",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Example: Story = {
  args: {
    size: "medium",
    color: "Blue400",
    label: "Radio 1",
    checked: true,
    disabled: false,
  },
};

export const RenderTest = () => {
  const [value, setValue] = useState(1);

  return (
    <Flex flexDirection="column" gap={32}>
      <h1>Current Value: {value}</h1>
      <Flex flexDirection="column" gap={16}>
        <Radio color="Amber500" label="Radio 1" checked={value === 1} onChange={() => setValue(1)} />
        <Radio color="Green500" label="Radio 2" checked={value === 2} disabled onChange={() => setValue(2)} />
        <Radio label="Radio 3" checked={value === 3} onChange={() => setValue(3)} />
      </Flex>
    </Flex>
  );
};
