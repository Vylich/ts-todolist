import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Provider } from "react-redux";
import AppWithRedux from "../AppWithRedux";
import { store } from "../components/state/store";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
  title: "App Story",
  component: AppWithRedux,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
};
export default meta;

export const AppStoryBase: StoryObj<typeof AppWithRedux> = {
  args: {},
};
