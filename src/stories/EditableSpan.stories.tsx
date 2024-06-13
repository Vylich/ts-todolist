import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import EditableSpan from "../components/EditableSpan";

const meta: Meta<typeof EditableSpan> = {
  title: "EditableSpan Story",
  component: EditableSpan,
  tags: ["autodocs"],
};
export default meta;

export const EditableSpanStoryBase: StoryObj<typeof EditableSpan> = {
  args: {
    title: "Test Task",
    onChange: fn((title: string) => console.log(title)),
  },
};
