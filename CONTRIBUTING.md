# Contributing to BCRM

Thank you for your interest in contributing to BCRM! This document provides guidelines and information about contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@bcrm.dev](mailto:conduct@bcrm.dev).

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 20+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm 10+
- Git
- Supabase account (free tier works)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/BCRM.git
cd BCRM

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Get your Supabase credentials from https://supabase.com/dashboard → Project Settings → API:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-service-role-key
```

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check [existing issues](https://github.com/mmdj04/BCRM/issues) to avoid duplicates.

When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Environment details

### Suggesting Features

Feature requests are welcome. Please provide:

- A clear description of the feature
- Use case / motivation
- Any mockups or examples

### Contributing Code

1. Find an issue labeled `good first issue` or `help wanted`
2. Comment on the issue to let others know you're working on it
3. Create a branch from `main`
4. Make your changes
5. Write or update tests if applicable
6. Submit a pull request

## Pull Request Process

1. Update the README.md if your changes affect the documentation
2. Ensure your code follows the project's style guidelines
3. Link the related issue in your PR description
4. Request a review from maintainers
5. Address any feedback promptly

### PR Title Format

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add new dashboard widget
fix: resolve login issue on mobile
docs: update installation guide
refactor: improve auth flow
```

## Style Guidelines

### TypeScript

- Use strict mode
- Avoid `any` types
- Use proper type annotations
- Prefer interfaces over types for object shapes

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow the co-location pattern (components near their routes)

### CSS/Tailwind

- Use semantic class names
- Follow the existing design system
- Use theme tokens for colors
- Ensure responsive design

### File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/
│   │   ├── auth/          # Authentication pages
│   │   └── dashboard/     # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/             # Shared components
│   └── ui/                # shadcn/ui components
├── lib/                    # Utilities and helpers
│   └── supabase/          # Supabase client setup
├── hooks/                  # Custom React hooks
└── styles/                 # Global styles
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add user authentication
fix: resolve sidebar collapse issue
docs: add API documentation
style: format code with biome
refactor: extract auth logic
test: add login form tests
chore: update dependencies
```

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

## Reporting Issues

Use the [issue tracker](https://github.com/mmdj04/BCRM/issues) to report bugs or request features.

When reporting security vulnerabilities, please follow our [Security Policy](SECURITY.md).

## Questions?

If you have questions about contributing, feel free to:

- Open a [discussion](https://github.com/mmdj04/BCRM/discussions)
- Reach out on [Discord](https://discord.gg/bcrm)

Thank you for contributing to BCRM! 🚀
