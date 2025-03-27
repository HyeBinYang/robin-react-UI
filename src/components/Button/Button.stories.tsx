import React from "react";
import Button from ".";
import Flex from "../Flex";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import color from "../../constant/color";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story) => (
      <Flex gap={8}>
        <Story />
      </Flex>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "outlined", "ghost"],
      description: "버튼 모양",
    },
    color: {
      control: "select",
      options: Object.keys(color),
      description: "버튼 색상",
    },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: "버튼 크기",
    },
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
    onClick: {
      description: "Click시 트리거되는 이벤트 헨들러",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "버튼 컴포넌트",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    variant: "contained",
    color: "Blue400",
    size: "large",
    disabled: false,
    children: "Test",
    onClick: action("Test Button Clicked"),
  },
};

export const Contained = () => {
  return (
    <>
      <Button variant="contained" color="Blue400" size="large" onClick={action("Contained Large Button Clicked")}>
        Large
      </Button>
      <Button variant="contained" color="Blue400" size="medium" onClick={action("Contained Medium Button Clicked")}>
        Medium
      </Button>
      <Button variant="contained" color="Blue400" size="small" onClick={action("Contained Small Button Clicked")}>
        Small
      </Button>
    </>
  );
};

export const Outlined = () => {
  return (
    <>
      <Button variant="outlined" color="Blue400" size="large" onClick={action("Outlined Large Button Clicked")}>
        Large
      </Button>
      <Button variant="outlined" color="Blue400" size="medium" onClick={action("Outlined Medium Button Clicked")}>
        Medium
      </Button>
      <Button variant="outlined" color="Blue400" size="small" onClick={action("Outlined Small Button Clicked")}>
        Small
      </Button>
    </>
  );
};

export const Ghost = () => {
  return (
    <>
      <Button variant="ghost" color="Blue400" size="large" onClick={action("Ghost Large Button Clicked")}>
        Large
      </Button>
      <Button variant="ghost" color="Blue400" size="medium" onClick={action("Ghost Medium Button Clicked")}>
        Medium
      </Button>
      <Button variant="ghost" color="Blue400" size="small" onClick={action("Ghost Small Button Clicked")}>
        Small
      </Button>
    </>
  );
};
