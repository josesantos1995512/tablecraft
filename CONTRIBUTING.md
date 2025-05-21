# Contributing to TableCraft 🤝

Thank you for your interest in contributing to TableCraft! This document provides guidelines and information for contributors.

## 🎯 Project Goals

TableCraft aims to be a modern, open-source project management tool that:
- Provides an intuitive table-based interface for task management
- Offers AI-powered task recommendations
- Supports real-time collaboration
- Maintains high code quality and developer experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/tablecraft.git
   cd tablecraft
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend
   cd frontend && npm run dev
   ```

## 🏷️ Issue Labels

We use the following labels to categorize issues:

- 🟢 **good first issue** - Perfect for new contributors
- 🟡 **enhancement** - New features or improvements
- 🔴 **bug** - Something isn't working
- 📚 **documentation** - Improvements or additions to documentation
- 🎨 **ui/ux** - User interface and experience improvements
- 🔧 **refactor** - Code refactoring
- ⚡ **performance** - Performance improvements
- 🧪 **testing** - Adding or improving tests

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards below
   - Add tests for new functionality
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and create a PR**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Wait for review**
   - All PRs require at least one review
   - Address any feedback from reviewers

## 📋 Coding Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React Components
- Use functional components with hooks
- Follow the component naming convention: `PascalCase`
- Keep components focused and reusable
- Use TypeScript interfaces for props

### CSS/Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Use CSS custom properties for theming
- Ensure accessibility standards (WCAG 2.1)

### Backend
- Use Express.js with TypeScript
- Follow RESTful API conventions
- Implement proper error handling
- Add input validation using Joi or similar

## 🧪 Testing

### Frontend Testing
- Write unit tests for components using Jest and React Testing Library
- Test user interactions and accessibility
- Maintain good test coverage (>80%)

### Backend Testing
- Write unit tests for controllers and services
- Test API endpoints with supertest
- Mock external dependencies

## 📚 Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update API documentation
- Create or update component stories (if using Storybook)

## 🎨 UI/UX Guidelines

- Follow the design system and component library
- Ensure responsive design works on all screen sizes
- Maintain consistent spacing and typography
- Test with screen readers for accessibility
- Use semantic HTML elements

## 🔄 Git Workflow

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/component-name` - Code refactoring

## 🚨 Reporting Bugs

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Screenshots** or GIFs if applicable
5. **Environment details** (OS, browser, Node.js version)
6. **Console errors** or logs

## 💡 Suggesting Features

When suggesting new features:

1. **Describe the problem** you're trying to solve
2. **Explain your proposed solution**
3. **Consider the impact** on existing functionality
4. **Think about implementation** complexity
5. **Consider alternatives** that might be simpler

## 🏆 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project README.md
- Release notes
- Community shoutouts

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Discord**: For real-time chat and collaboration

## 📄 License

By contributing to TableCraft, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TableCraft! 🎉 