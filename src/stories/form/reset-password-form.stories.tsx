import ResetPasswordForm from "@/components/form/reset-password-form";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { within, expect, userEvent } from "storybook/test";

const meta = {
  title: "Form/Reset Password Form",
  component: ResetPasswordForm,
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
} satisfies Meta<typeof ResetPasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const passwordInput = canvas.getByLabelText("New Password");
    const confirmPasswordInput = canvas.getByLabelText("Confirm Password");
    const submitButton = canvas.getByRole("button", {
      name: /reset password/i,
    });

    await expect(passwordInput).toBeInTheDocument();
    await expect(confirmPasswordInput).toBeInTheDocument();
    await expect(submitButton).toBeInTheDocument();

    await userEvent.type(passwordInput, "newpassword123");
    await userEvent.type(confirmPasswordInput, "newpassword123");

    await expect(passwordInput).toHaveValue("newpassword123");
    await expect(confirmPasswordInput).toHaveValue("newpassword123");

    await userEvent.click(submitButton);

    await expect(
      await canvas.findByText(
        "Password has been successfully reset!",
        {},
        { timeout: 3000 }
      )
    ).toBeInTheDocument();
  },
};

export const MismatchError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const passwordInput = canvas.getByLabelText("New Password");
    const confirmPasswordInput = canvas.getByLabelText("Confirm Password");
    const submitButton = canvas.getByRole("button", {
      name: /reset password/i,
    });

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password456");

    await userEvent.click(submitButton);

    await expect(
      await canvas.findByText("Passwords do not match.", {}, { timeout: 3000 })
    ).toBeInTheDocument();
  },
};
