import React from "react";
import Flex from "../Flex";
import type { Meta, StoryObj } from "@storybook/react";
import Select from ".";
import Typography from ".";
import colors from "../../constant/color";
import typography from "../../constant/typography";

const meta: Meta<typeof Select> = {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    font: {
      control: "select",
      options: Object.keys(typography),
      description: "텍스트 폰트",
    },
    color: {
      control: "select",
      options: Object.keys(colors),
      description: "텍스트 색깔",
    },
    children: {
      control: "text",
      description: "텍스트",
    },
    as: {
      control: "text",
      description: "태그 (HTML Element)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Test: Story = {
  args: {
    as: "h1",
    children: "Typography",
    font: "Body1Regular",
    color: "Blue400",
  },
};

export const Fonts = () => {
  return (
    <Flex inline flexDirection="column" gap={8}>
      <Typography font="Heading1Pc">Heading 1 PC</Typography>
      <Typography font="Heading1Mobile">Heading 1 Mobile</Typography>
      <Typography font="Heading2Pc">Heading 2 PC</Typography>
      <Typography font="Heading2Mobile">Heading 2 Mobile</Typography>
      <Typography font="Heading3Pc">Heading 3 PC</Typography>
      <Typography font="Heading3Mobile">Heading 3 Mobile</Typography>
      <Typography font="Heading4Pc">Heading 4 PC</Typography>
      <Typography font="Heading4Mobile">Heading 4 Mobile</Typography>
      <Typography font="Subtitle1">Subtitle 1</Typography>
      <Typography font="Subtitle2">Subtitle 2</Typography>
      <Typography font="Subtitle3">Subtitle 3</Typography>
      <Typography font="Body1Regular">Body 1 Regular</Typography>
      <Typography font="Body1Medium">Body 1 Medium</Typography>
      <Typography font="Body2Regular">Body 2 Regular</Typography>
      <Typography font="Body2Medium">Body 2 Medium</Typography>
      <Typography font="Body3Regular">Body 3 Regular</Typography>
      <Typography font="Body3Medium">Body 3 Medium</Typography>
      <Typography font="Body4Regular">Body 4 Regular</Typography>
      <Typography font="Body4Medium">Body 4 Medium</Typography>
      <Typography font="Detail1">Detail 1</Typography>
      <Typography font="Detail2">Detail 2</Typography>
    </Flex>
  );
};
