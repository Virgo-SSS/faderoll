import ForgotPasswordForm from '@/components/form/forgot-password-form'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { within, expect, userEvent, fireEvent } from 'storybook/test'

const meta = {
  title: 'Components/Form/Forgot Password Form',
  component: ForgotPasswordForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByLabelText('Email')
    const submitButton = canvas.getByRole('button', {
      name: /send reset link/i,
    })

    await expect(emailInput).toBeInTheDocument()
    await expect(submitButton).toBeInTheDocument()

    await userEvent.type(emailInput, 'test@example.com')
    await expect(emailInput).toHaveValue('test@example.com')

    await userEvent.click(submitButton)
  },
}

export const InvalidEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByLabelText('Email')

    await expect(emailInput).toBeInTheDocument()

    await userEvent.type(emailInput, 'invalid-email')

    // Bypass browser validation to test custom validation
    const form = canvasElement.querySelector('form')
    if (form) {
      fireEvent.submit(form)
    }

    await expect(
      await canvas.findByText('Please enter a valid email address.', {}, { timeout: 3000 })
    ).toBeInTheDocument()
  },
}
