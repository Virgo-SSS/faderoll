# Agent Instructions for Faderoll

## Project Overview

**Faderoll** is a comprehensive barbershop management system designed to streamline operations, track performance, and automate administrative tasks for barbershops.

### Target Users
- Barbershop owners and managers
- Barbers and staff
- Customers (for booking and account management)

### Core Purpose
Provide an all-in-one solution for managing barbershop operations including:
- Barber performance tracking and analytics
- Product sales and inventory management
- Automated salary calculation with bonus structures
- Booking system with conflict resolution
- Customer relationship management (CRM)
- Invoice and financial reporting
- Role-based access control

---

## Business Domain & Logic

### 1. Barber Performance Tracking

**Key Metrics:**
- Number of services completed
- Revenue generated per barber
- Customer ratings and feedback
- Service completion time
- Repeat customer rate

**Business Rules:**
- Each service must be attributed to a specific barber
- Performance data should be tracked daily, weekly, and monthly
- Barbers can view their own performance metrics
- Managers can view all barber performance data

### 2. Salary & Bonus System

**Salary Calculation Methods:**
- **Fixed Salary**: Base monthly salary
- **Commission-Based**: Percentage of revenue generated
- **Hybrid**: Base salary + commission on services/products
- **Performance Bonuses**: Additional bonuses based on targets

**Bonus Structure Rules:**
- Service count bonuses (e.g., bonus for completing 100+ services/month)
- Revenue target bonuses (e.g., bonus for generating $5000+/month)
- Customer satisfaction bonuses (e.g., maintaining 4.5+ rating)
- Product sales bonuses (percentage of product sales)

**Automation Requirements:**
- Automatically calculate salaries at end of pay period
- Generate detailed salary breakdown (base + commission + bonuses)
- Track salary history for reporting and tax purposes
- Support different pay periods (weekly, bi-weekly, monthly)

### 3. Product Sales & Inventory

**Product Management:**
- Track product stock levels
- Alert when inventory is low (configurable threshold)
- Record product sales with barber attribution
- Calculate profit margins

**Sales Attribution:**
- Each product sale must be attributed to the selling barber
- Product sales contribute to barber commission/bonuses
- Track best-selling products and trends

**Inventory Rules:**
- Prevent selling products with zero stock
- Support bulk inventory updates
- Track supplier information and reorder points
- Record product purchase history

### 4. Booking System

**Booking Logic:**
- Customers can book appointments with specific barbers
- Each barber has configurable working hours and availability
- Services have defined durations
- Prevent double-booking conflicts

**Walk-in Handling:**
- Support walk-in customers without prior booking
- Walk-ins can be added to queue or assigned to available barber
- Track both booked and walk-in customers for analytics

**Conflict Resolution:**
- Validate booking times against barber availability
- Check for overlapping appointments
- Allow managers to override conflicts if necessary
- Send notifications for booking confirmations and reminders

### 5. Customer Relationship Management (CRM)

**Customer Data:**
- Contact information (name, phone, email)
- Service history and preferences
- Favorite barbers
- Spending history and loyalty points
- Special notes and preferences

**CRM Features:**
- Track customer visit frequency
- Identify VIP/high-value customers
- Send promotional messages and reminders
- Birthday/anniversary notifications
- Loyalty program management

### 6. Role-Based Access Control

**User Roles:**

1. **Admin/Owner**
   - Full system access
   - Manage all users and settings
   - View all financial reports
   - Configure business rules and pricing

2. **Manager**
   - View all barber performance
   - Manage bookings and schedules
   - Generate reports
   - Manage inventory
   - Cannot modify system settings

3. **Barber**
   - View own schedule and bookings
   - View own performance metrics
   - Record services and product sales
   - View assigned customers
   - Cannot access other barbers' data

4. **Receptionist**
   - Manage bookings
   - Check-in customers
   - Process payments
   - Limited reporting access

5. **Customer**
   - Book appointments
   - View booking history
   - Update profile information
   - View loyalty points

---

## Technical Stack

### Framework & Core Technologies
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: Lucide React icons, Class Variance Authority

### Architecture Patterns

#### App Router Structure
- **Pages**: `src/app/*/page.tsx`
- **Layouts**: `src/app/*/layout.tsx`
- **Loading States**: `src/app/*/loading.tsx`
- **Error Handling**: `src/app/*/error.tsx`

#### Server vs Client Components
- **Default to Server Components** for better performance
- Use `'use client'` directive only when necessary:
  - Using React hooks (`useState`, `useEffect`, `useContext`)
  - Event listeners (`onClick`, `onChange`, etc.)
  - Browser-only APIs
  - Third-party libraries that require client-side rendering

#### Data Fetching Strategy
- **Server Components**: Fetch data directly using `async/await`
- **Mutations**: Use Server Actions for form submissions and data updates
- **Client-side fetching**: Only when necessary (real-time updates, user interactions)

### Styling with Tailwind CSS v4

**Configuration:**
- Global styles and theme configuration in `src/app/globals.css`
- Use `@theme` directive for Tailwind v4 configuration
- CSS variables for theming (`--background`, `--foreground`, etc.)

**Dark Mode:**
- Handled via CSS variables and `@media (prefers-color-scheme: dark)`
- Automatic dark mode support based on system preferences

**Best Practices:**
- Use utility classes for styling
- Create reusable component variants with `class-variance-authority`
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes

---

## Development Guidelines

### File Structure

```
src/
├── app/                    # Application routes (App Router)
│   ├── (auth)/            # Auth-related routes (grouped)
│   ├── (dashboard)/       # Dashboard routes (grouped)
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── features/         # Feature-specific components
├── lib/                   # Utility functions and shared logic
│   ├── utils.ts          # General utilities
│   ├── db/               # Database utilities
│   └── validations/      # Zod schemas and validations
└── types/                 # TypeScript type definitions
```

### TypeScript Conventions

**1. Use Interfaces for Props and Data Structures**
```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ label, variant = 'primary', onClick, disabled }: ButtonProps) {
  // Implementation
}
```

**2. Avoid `any` - Use Specific Types**
```tsx
// ❌ Bad
function processData(data: any) { }

// ✅ Good
interface UserData {
  id: string;
  name: string;
  email: string;
}

function processData(data: UserData) { }
```

**3. Use Type Inference When Obvious**
```tsx
// Type is inferred as string
const name = "John Doe";

// Explicit typing when not obvious
const [count, setCount] = useState<number>(0);
```

**4. Create Type Definitions for Domain Models**
```tsx
// src/types/barber.ts
export interface Barber {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  commissionRate: number;
}

// src/types/booking.ts
export interface Booking {
  id: string;
  customerId: string;
  barberId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
```

### Component Patterns

**1. Server Component (Default)**
```tsx
// src/app/barbers/page.tsx
import { getBarbersFromDB } from '@/lib/db/barbers';

export default async function BarbersPage() {
  const barbers = await getBarbersFromDB();
  
  return (
    <div>
      {barbers.map(barber => (
        <BarberCard key={barber.id} barber={barber} />
      ))}
    </div>
  );
}
```

**2. Client Component (When Needed)**
```tsx
// src/components/booking-form.tsx
'use client';

import { useState } from 'react';

export function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  return (
    <form>
      {/* Form implementation */}
    </form>
  );
}
```

**3. Server Actions for Mutations**
```tsx
// src/app/actions/booking.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createBooking(formData: FormData) {
  const bookingData = {
    barberId: formData.get('barberId'),
    serviceId: formData.get('serviceId'),
    // ... other fields
  };
  
  // Validate and save to database
  await saveBookingToDB(bookingData);
  
  // Revalidate the bookings page
  revalidatePath('/bookings');
  
  return { success: true };
}
```

### Code Organization Best Practices

**1. Feature-Based Organization**
- Group related components, hooks, and utilities by feature
- Keep feature-specific code together

**2. Reusable UI Components**
- Create generic, reusable components in `src/components/ui/`
- Use composition over configuration
- Document component props with JSDoc comments

**3. Separation of Concerns**
- Keep business logic separate from UI components
- Use custom hooks for complex state management
- Extract data fetching to dedicated functions

**4. Error Handling**
- Use error boundaries for graceful error handling
- Provide meaningful error messages to users
- Log errors for debugging

### Performance Best Practices

**1. Optimize Images**
- Use Next.js `<Image>` component
- Provide appropriate sizes and formats
- Use lazy loading for below-the-fold images

**2. Code Splitting**
- Use dynamic imports for large components
- Lazy load routes and features

**3. Caching Strategy**
- Leverage Next.js caching mechanisms
- Use `revalidatePath` and `revalidateTag` appropriately
- Implement optimistic updates for better UX

### Security Considerations

**1. Authentication & Authorization**
- Implement proper authentication flow
- Validate user permissions on server-side
- Protect API routes and Server Actions

**2. Input Validation**
- Validate all user inputs on both client and server
- Use Zod or similar for schema validation
- Sanitize data before database operations

**3. Data Privacy**
- Implement proper data access controls
- Don't expose sensitive data in client components
- Follow GDPR/privacy regulations for customer data

---

## Database Schema & Data Models

### Core Entities

**1. Users**
- `id`: Unique identifier
- `email`: Email address (unique)
- `name`: Full name
- `role`: User role (admin, manager, barber, receptionist, customer)
- `phone`: Phone number
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

**2. Barbers** (extends Users)
- `userId`: Reference to Users table
- `specialties`: Array of specialties
- `commissionRate`: Commission percentage
- `workingHours`: Schedule configuration
- `rating`: Average customer rating
- `isActive`: Active status

**3. Customers** (extends Users)
- `userId`: Reference to Users table
- `favoriteBarbers`: Array of barber IDs
- `loyaltyPoints`: Accumulated points
- `preferences`: Customer preferences and notes
- `totalSpent`: Lifetime spending

**4. Services**
- `id`: Unique identifier
- `name`: Service name
- `description`: Service description
- `duration`: Service duration in minutes
- `price`: Service price
- `category`: Service category
- `isActive`: Active status

**5. Bookings**
- `id`: Unique identifier
- `customerId`: Reference to customer
- `barberId`: Reference to barber
- `serviceId`: Reference to service
- `startTime`: Appointment start time
- `endTime`: Appointment end time
- `status`: Booking status
- `notes`: Special notes
- `isWalkIn`: Walk-in flag

**6. Products**
- `id`: Unique identifier
- `name`: Product name
- `description`: Product description
- `price`: Selling price
- `cost`: Cost price
- `stockQuantity`: Current stock
- `lowStockThreshold`: Alert threshold
- `category`: Product category
- `supplierId`: Reference to supplier

**7. Sales**
- `id`: Unique identifier
- `productId`: Reference to product
- `barberId`: Reference to selling barber
- `customerId`: Reference to customer (optional)
- `quantity`: Quantity sold
- `totalPrice`: Total sale price
- `commission`: Barber commission
- `saleDate`: Sale timestamp

**8. Salaries**
- `id`: Unique identifier
- `barberId`: Reference to barber
- `period`: Pay period (start-end dates)
- `baseSalary`: Base salary amount
- `serviceCommission`: Commission from services
- `productCommission`: Commission from products
- `bonuses`: Array of bonuses with reasons
- `totalAmount`: Total salary
- `status`: Payment status
- `paidAt`: Payment timestamp

---

## Feature Implementation Guidelines

### Adding New Features

**1. Plan the Feature**
- Define user stories and requirements
- Design database schema changes
- Plan API endpoints and data flow
- Consider role-based access requirements

**2. Implement Database Layer**
- Create/update database schema
- Write database query functions
- Add validation schemas

**3. Build Server Actions**
- Implement server-side logic
- Add input validation
- Handle error cases
- Implement authorization checks

**4. Create UI Components**
- Build reusable components
- Implement client-side validation
- Add loading and error states
- Ensure responsive design

**5. Testing**
- Test with different user roles
- Validate edge cases
- Test error handling
- Verify performance

### Testing Requirements

**1. Manual Testing Checklist**
- Test all user roles and permissions
- Verify data validation (client and server)
- Test error scenarios
- Check responsive design on different devices
- Verify accessibility (keyboard navigation, screen readers)

**2. Automated Testing** (when implemented)
- Unit tests for utility functions
- Integration tests for Server Actions
- E2E tests for critical user flows

### Documentation Standards

**1. Code Comments**
- Use JSDoc for functions and components
- Document complex business logic
- Explain non-obvious decisions

**2. README Updates**
- Document new features
- Update setup instructions
- Add troubleshooting guides

---

## Development Workflow

### Commands
- **Development Server**: `npm run dev` (runs on http://localhost:3000)
- **Production Build**: `npm run build`
- **Start Production**: `npm start`
- **Linting**: `npm run lint`

### Git Workflow
- Create feature branches from `main`
- Use descriptive commit messages
- Keep commits focused and atomic
- Test before pushing

### Code Review Guidelines
- Ensure code follows TypeScript and React best practices
- Verify proper error handling
- Check for security vulnerabilities
- Validate business logic correctness
- Ensure responsive design

---

## Common Patterns & Examples

### Example: Creating a New Page with Data Fetching

```tsx
// src/app/dashboard/barbers/page.tsx
import { getBarbersWithStats } from '@/lib/db/barbers';
import { BarberCard } from '@/components/features/barbers/barber-card';

export default async function BarbersPage() {
  const barbers = await getBarbersWithStats();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Barbers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map(barber => (
          <BarberCard key={barber.id} barber={barber} />
        ))}
      </div>
    </div>
  );
}
```

### Example: Server Action with Validation

```tsx
// src/app/actions/barber.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createBarber } from '@/lib/db/barbers';

const barberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  commissionRate: z.number().min(0).max(100),
  specialties: z.array(z.string()).min(1, 'At least one specialty required'),
});

export async function addBarber(formData: FormData) {
  // Parse and validate input
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    commissionRate: Number(formData.get('commissionRate')),
    specialties: JSON.parse(formData.get('specialties') as string),
  };
  
  const result = barberSchema.safeParse(data);
  
  if (!result.success) {
    return { 
      success: false, 
      errors: result.error.flatten().fieldErrors 
    };
  }
  
  try {
    await createBarber(result.data);
    revalidatePath('/dashboard/barbers');
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to create barber' 
    };
  }
}
```

### Example: Reusable UI Component

```tsx
// src/components/ui/card.tsx
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6',
        {
          'bg-background border border-border': variant === 'default',
          'border-2 border-primary': variant === 'outlined',
          'shadow-lg bg-background': variant === 'elevated',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
```

---

## Key Reminders for AI Agents

1. **Always consider role-based access** when implementing features
2. **Validate business logic** against the rules defined in this document
3. **Use Server Components by default**, only use Client Components when necessary
4. **Follow TypeScript best practices** - avoid `any`, use proper types
5. **Implement proper error handling** at all levels
6. **Consider performance implications** of data fetching and rendering
7. **Maintain consistency** with existing code patterns
8. **Document complex business logic** with comments
9. **Test with different user roles** to ensure proper access control
10. **Keep security in mind** - validate inputs, protect sensitive data

---

## Questions to Ask When Uncertain

- What user role should have access to this feature?
- How should this feature handle errors?
- What validation rules apply to this data?
- Should this be a Server or Client Component?
- How does this affect barber salary calculations?
- Are there any business rules that constrain this feature?
- What happens if the user is offline or the request fails?
- How should this feature work on mobile devices?
