# Faderoll - Barbershop Management System

A comprehensive barbershop management system built with Next.js 16, TypeScript, and React 19.

## 🚀 Features

- **Barber Performance Tracking** - Monitor services, revenue, and customer ratings
- **Automated Salary Calculation** - Calculate salaries with commissions and bonuses
- **Product Sales & Inventory** - Track product sales and manage inventory
- **Booking System** - Manage appointments with conflict resolution
- **Customer CRM** - Track customer history, preferences, and loyalty
- **Role-Based Access** - Secure access control for different user types
- **Analytics & Reporting** - Comprehensive business insights

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd faderoll
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
faderoll/
├── .agent/                 # Agent instructions and workflows
├── .github/               # GitHub configuration
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   └── lib/              # Utility functions and shared logic
├── public/               # Static assets
└── package.json
```

## 📚 Documentation

- **[Agent Instructions](.agent/instructions.md)** - Comprehensive guide for AI agents working on this project
- **[Copilot Instructions](.github/copilot-instructions.md)** - GitHub Copilot specific guidelines

## 🧑‍💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- Use TypeScript for all code
- Follow React 19 and Next.js 16 best practices
- Default to Server Components
- Use Tailwind CSS for styling
- See [agent instructions](.agent/instructions.md) for detailed guidelines

## 🔐 User Roles

- **Admin/Owner** - Full system access
- **Manager** - Operations and reporting
- **Barber** - Personal schedule and performance
- **Receptionist** - Booking and customer management
- **Customer** - Booking and profile management

## 📄 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]
