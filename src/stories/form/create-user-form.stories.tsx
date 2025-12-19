import CreateUserForm from '@/components/form/create-user-form'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Components/Form/Create User Form',
  component: CreateUserForm,
} satisfies Meta<typeof CreateUserForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
