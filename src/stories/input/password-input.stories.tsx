import PasswordInput from "@/components/input/password-input";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "Input/Password Input",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RightIcon: Story = {
  args: {
    placeholder: "Enter your password",
    iconPosition: "right",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByPlaceholderText(
      "Enter your password"
    ) as HTMLInputElement;
    await expect(passwordInput.type).toBe("password");
  },
};

export const LeftIcon: Story = {
  args: {
    placeholder: "Enter your password",
    iconPosition: "left",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByPlaceholderText(
      "Enter your password"
    ) as HTMLInputElement;
    await expect(passwordInput.type).toBe("password");
  },
};

export const ToggleVisibility: Story = {
  args: {
    placeholder: "Enter your password",
    iconPosition: "right",
    id: "password-input",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const passwordInput = canvas.getByPlaceholderText(
      "Enter your password"
    ) as HTMLInputElement;
    await expect(passwordInput.type).toBe("password");

    const iconButton = canvasElement.querySelector(
      "#icon-button"
    ) as HTMLElement;

    await userEvent.click(iconButton);
    await expect(passwordInput.type).toBe("text");

    await userEvent.click(iconButton);
    await expect(passwordInput.type).toBe("password");
  },
};
