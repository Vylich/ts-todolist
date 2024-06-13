import type { Meta, StoryObj } from "@storybook/react";
import Task from "../components/Task";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";

const meta: Meta<typeof Task> = {
  title: "Task Story",
  component: Task,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
};
export default meta;

export const TaskStoryBase: StoryObj<typeof Task> = {
  args: {
    id: "1",
    title: "Test Task",
    isDone: false,
    taskId: "1",
  },
};

export const TaskStoryChecked: StoryObj<typeof Task> = {
  args: {
    id: "1",
    title: "Test Task",
    isDone: true,
    taskId: "2",
  },
};
