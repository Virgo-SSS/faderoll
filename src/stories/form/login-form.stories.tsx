import LoginForm from "@/components/form/login-form";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within, expect, userEvent, fireEvent } from "storybook/test";

const meta = {
  title: "Form/Login Form",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText("Email");
    const passwordInput = canvas.getByLabelText("Password");
    const submitButton = canvas.getByRole("button", { name: /sign in/i });

    await expect(emailInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();
    await expect(submitButton).toBeInTheDocument();

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    await expect(emailInput).toHaveValue("test@example.com");
    await expect(passwordInput).toHaveValue("password123");

    await userEvent.click(submitButton);
  },
};

export const InvalidEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText("Email");
    const passwordInput = canvas.getByLabelText("Password");

    await expect(emailInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(passwordInput, "password123");

    const form = canvasElement.querySelector("form");
    if (form) {
      fireEvent.submit(form);
    }

    await expect(
      await canvas.findByText(
        "Please enter a valid email address.",
        {},
        { timeout: 3000 }
      )
    ).toBeInTheDocument();
  },
};

export const ShortPassword: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText("Email");
    const passwordInput = canvas.getByLabelText("Password");
    const submitButton = canvas.getByRole("button", { name: /sign in/i });

    await expect(emailInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "123");

    await userEvent.click(submitButton);

    await expect(
      await canvas.findByText(
        "Password must be at least 6 characters.",
        {},
        { timeout: 3000 }
      )
    ).toBeInTheDocument();
  },
};
