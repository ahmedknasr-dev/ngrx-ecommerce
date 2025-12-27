# NgRx E-commerce

A modern e-commerce application built with Angular 21, NgRx for state management, and Bootstrap for styling. Features product browsing, filtering, cart management, and detailed product views with recommendations.

## Features

- 🛍️ **Product Listing** - Browse products with pagination and filtering
- 🔍 **Product Details** - View detailed product information with recommendations
- 🛒 **Shopping Cart** - Add, update, and remove items from cart
- 🎨 **Responsive Design** - Mobile-first design using Bootstrap 5
- 🔐 **Authentication** - Login/logout functionality with auth guards
- 📦 **State Management** - NgRx store for predictable state management
- ⚡ **Modern Angular** - Built with Angular 21 standalone components and signals

## Tech Stack

- **Angular 21** - Latest Angular framework with standalone components
- **NgRx** - Redux pattern for state management
- **Bootstrap 5** - Responsive UI framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **Vitest** - Fast unit testing

## Project Structure

```
src/app/
├── core/                 # Core services, models, and guards
│   ├── guards/          # Route guards (auth)
│   ├── interceptors/    # HTTP interceptors
│   ├── models/          # TypeScript interfaces
│   └── services/        # API services
├── pages/               # Feature pages
│   ├── products/       # Products listing with filters
│   ├── product-details/ # Product details with components
│   ├── cart/           # Shopping cart
│   └── login/          # Authentication
└── store/              # NgRx state management
    ├── products/       # Products state
    └── cart/          # Cart state
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v11.6.2 or higher)

### Installation

1. Clone the repository

```bash
git clone https://github.com/ahmedknasr-dev/ngrx-ecommerce.git
cd ngrx-ecommerce
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200/`

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint TypeScript files
- `npm run lint:fix` - Lint and auto-fix issues
- `npm run format` - Format code with Prettier

## Architecture Highlights

### State Management

- NgRx store with actions, reducers, effects, and selectors
- Facades for simplified state access
- Local storage persistence for cart

### Component Architecture

- Smart (container) components manage state
- Dumb (presentational) components receive data via inputs
- Signal-based components for reactive UI
- OnPush change detection for performance

### Code Quality

- ESLint for TypeScript linting
- Prettier for code formatting
- Husky for Git hooks
- Commitlint for conventional commit messages
