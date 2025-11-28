import IconInput from "@/components/input/icon-input";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search } from "lucide-react";
import { within, expect, userEvent, fn } from "storybook/test";

const meta = {
  title: "Input/Icon Input",
  component: IconInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RightIcon: Story = {
  args: {
    placeholder: "Search...",
    icon: <Search />,
    iconPosition: "right",
  },
  play: async ({ canvasElement }) => {
    const iconButton = canvasElement.querySelector(
      "#icon-button"
    ) as HTMLElement;

    await expect(iconButton).toBeInTheDocument();
    await expect(iconButton).toHaveAttribute("data-align", "inline-end");
  },
};

export const LeftIcon: Story = {
  args: {
    placeholder: "Look up...",
    icon: <Search />,
    iconPosition: "left",
  },
  play: async ({ canvasElement }) => {
    const iconButton = canvasElement.querySelector(
      "#icon-button"
    ) as HTMLElement;

    await expect(iconButton).toBeInTheDocument();
    await expect(iconButton).toHaveAttribute("data-align", "inline-start");
  },
};

export const ClickableIcon: Story = {
  args: {
    placeholder: "Search...",
    icon: <Search />,
    iconPosition: "right",
    onIconClick: fn(() => {
      console.log("Icon clicked");
    }),
  },
  play: async ({ args, canvasElement }) => {
    const iconButton = canvasElement.querySelector(
      "#icon-button"
    ) as HTMLElement;

    await expect(iconButton).toBeInTheDocument();
    await userEvent.click(iconButton);

    await expect(args.onIconClick).toHaveBeenCalled();
  },
};
