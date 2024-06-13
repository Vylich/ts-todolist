import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import AddItem from "../components/AddItem";

const meta = {
  title: "AddItem Story",
  component: AddItem,
} satisfies Meta<typeof AddItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItemStoryBase: Story = {
  args: {
    addItem: fn((title: string) => console.log(title)),
  },
};
