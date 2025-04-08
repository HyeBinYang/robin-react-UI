import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Box from ".";

const meta: Meta<typeof Box> = {
  title: "Layouts/Box",
  component: Box,
};

export default meta;

export type Story = StoryObj<typeof Box>;

export const Example = () => {
  return (
    <Box width="auto" padding={"12px"} color="Blue600">
      wewe
    </Box>
  );
};
