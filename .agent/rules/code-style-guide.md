---
trigger: always_on
---

## File Naming Conventions

**Always use kebab-case for all files and directories:**

- Components: `barber-card.tsx`, `booking-form.tsx`
- Stories: `login-form.stories.tsx`
- Tests: `utils.test.ts`, `icon-input.test.tsx`
- Types: `barber.ts`, `booking.ts`

---

## Component Development

### Component Structure Priority

1. **Shadcn UI First**: Always check if Shadcn UI has a suitable component
2. **Extend Shadcn**: If close match exists, extend with `cn()` utility
3. **Custom Component**: Only create custom when no Shadcn alternative exists

### Component Categories

| Category           | Location                   | Description                  |
| ------------------ | -------------------------- | ---------------------------- |
| Atoms/UI           | `src/components/ui/`       | Base Shadcn components       |
| Feature Components | `src/components/{name}/`   | Reusable molecules/organisms |
| Domain Features    | `src/components/features/` | Domain-specific (optional)   |

### Function Components (Preferred Pattern)

```tsx
// ✅ CORRECT - Function declaration with default export
export default function MyComponent() {
  return <div>Hello</div>
}

// ❌ WRONG - Arrow function assignment
export const MyComponent = () => {
  return <div>Hello</div>
}
```

### Props with Interfaces

```tsx
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'outline'
  onClick?: () => void
  disabled?: boolean
}

export default function Button({ label, variant = 'primary', onClick, disabled }: ButtonProps) {
  // Implementation
}
```

### Extending Shadcn Components

```tsx
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customProp?: string
}

export function CustomButton({ className, ...props }: CustomButtonProps) {
  return <Button className={cn('bg-brand-500 hover:bg-brand-600', className)} {...props} />
}
```

---

## Server vs Client Components

### Default to Server Components

Server components provide better performance. Only use client components when required.

```tsx
// src/app/barbers/page.tsx (Server Component - default)
import { getBarbersFromDB } from '@/lib/db/barbers'
import { BarberCard } from '@/components/BarberCard/barber-card'

export default async function BarbersPage() {
  const barbers = await getBarbersFromDB()

  return (
    <div className="grid gap-4">
      {barbers.map((barber) => (
        <BarberCard key={barber.id} barber={barber} />
      ))}
    </div>
  )
}
```

### Use Client Components Only When Needed

Add `'use client'` directive only for:

- React hooks (`useState`, `useEffect`, `useContext`)
- Event listeners (`onClick`, `onChange`)
- Browser-only APIs
- Third-party libraries requiring client-side rendering

```tsx
// src/components/BookingForm/booking-form.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <form className="space-y-4">
      {/* Form content */}
      <Button type="submit">Book Appointment</Button>
    </form>
  )
}
```

---

## Server Actions

Use Server Actions for all data mutations:

```tsx
// src/app/actions/barber.ts
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const barberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  commissionRate: z.number().min(0).max(100),
})

export async function addBarber(formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    commissionRate: Number(formData.get('commissionRate')),
  }

  const result = barberSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await createBarber(result.data)
    revalidatePath('/dashboard/barbers')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create barber',
    }
  }
}
```

## TypeScript Guidelines

### Strict Rules

| Rule                 | Description                         |
| -------------------- | ----------------------------------- |
| No `any`             | Always use specific types           |
| Interfaces for Props | Use `interface` for component props |
| Type Inference       | Use when obvious, explicit when not |
| Domain Models        | Create types in `src/types/`        |

### Type Examples

```tsx
// ✅ CORRECT - Specific types
interface UserData {
  id: string
  name: string
  email: string
}

function processData(data: UserData) {}

// ❌ WRONG - Using any
function processData(data: any) {}
```

### Domain Type Definitions

```tsx
// src/types/barber.ts
export interface Barber {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  rating: number
  commissionRate: number
}

// src/types/booking.ts
export interface Booking {
  id: string
  customerId: string
  barberId: string
  serviceId: string
  startTime: Date
  endTime: Date
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}
```

---

## Styling with Tailwind CSS v4

### Configuration

- Global styles in `src/app/globals.css`
- Use `@theme` directive for Tailwind v4
- CSS variables for theming with OKLCH color space

### Key CSS Variables

```css
/* Light Mode */
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
--primary: oklch(0.205 0 0);
--destructive: oklch(0.577 0.245 27.325);

/* Dark Mode (in .dark class) */
--background: oklch(0.145 0 0);
--foreground: oklch(0.985 0 0);
```

### Best Practices

1. Use utility classes for styling
2. Create reusable variants with `class-variance-authority`
3. Use `cn()` utility from `@/lib/utils` for conditional classes
4. Dark mode via `.dark` class toggle

---

## Testing Guidelines

### Test Structure

| Test Type        | Location                      | File Suffix                           |
| ---------------- | ----------------------------- | ------------------------------------- |
| Unit/Integration | `src/tests/` (mirrors `src/`) | `.test.ts`, `.test.tsx`               |
| Storybook        | `src/stories/`                | `.stories.tsx` (with `play` function) |

### Test File Placement

```
src/lib/utils.ts         → src/tests/lib/utils.test.ts
src/components/input/    → src/tests/components/input/
src/app/actions/booking  → src/tests/app/actions/booking.test.ts
```

### Storybook Play Function Example

```tsx
// src/stories/form/login-form.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test'
import { LoginForm } from '@/components/form/login-form'

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByLabelText(/email/i)
    await userEvent.type(emailInput, 'test@example.com')

    const passwordInput = canvas.getByLabelText(/password/i)
    await userEvent.type(passwordInput, 'password123')

    const submitButton = canvas.getByRole('button', { name: /login/i })
    await expect(submitButton).toBeEnabled()
  },
}
```
