import Button from ".";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Flex } from "..";

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
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
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
    color: "primary",
    size: "large",
    children: "Test",
    onClick: action("Test Button Clicked"),
  },
};

export const Primary = () => {
  return (
    <>
      <Button color="primary" size="large" onClick={action("Primary Large Button Clicked")}>
        Large
      </Button>
      <Button color="primary" size="medium" onClick={action("Primary Medium Button Clicked")}>
        Medium
      </Button>
      <Button color="primary" size="small" onClick={action("Primary Small Button Clicked")}>
        Small
      </Button>
    </>
  );
};

export const Secondary = () => {
  return (
    <>
      <Button color="secondary" size="large" onClick={action("Secondary Large Button Clicked")}>
        Large
      </Button>
      <Button color="secondary" size="medium" onClick={action("Secondary Medium Button Clicked")}>
        Medium
      </Button>
      <Button color="secondary" size="small" onClick={action("Secondary Small Button Clicked")}>
        Small
      </Button>
    </>
  );
};

export const Tertiary = () => {
  return (
    <>
      <Button color="tertiary" size="large" onClick={action("Tertiary Large Button Clicked")}>
        Large
      </Button>
      <Button color="tertiary" size="medium" onClick={action("Tertiary Medium Button Clicked")}>
        Medium
      </Button>
      <Button color="tertiary" size="small" onClick={action("Tertiary Small Button Clicked")}>
        Small
      </Button>
    </>
  );
};
