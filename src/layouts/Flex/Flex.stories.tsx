import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Flex from ".";
import Button from "../../components/Button";

const meta: Meta<typeof Flex> = {
  title: "Layouts/Flex",
  component: Flex,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Example: Story = {
  args: {
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
        <Button>Button 6</Button>
        <Button>Button 7</Button>
        <Button>Button 8</Button>
        <Button>Button 9</Button>
        <Button>Button 10</Button>
      </>
    ),
  },
};
