# Contributing to HS India

Thank you for your interest in contributing to HS India! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/hs-india.git
   cd hs-india
   ```

2. **Install Dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp env.example .env
   cp backend/env.example backend/.env
   
   # Edit with your configuration
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend
   npm start
   ```

## 📋 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic

### Git Workflow
1. Create a feature branch from `develop`
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

3. Push and create Pull Request
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format
Use conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add user authentication system
fix: resolve image upload validation issue
docs: update API documentation
```

## 🧪 Testing

### Frontend Testing
```bash
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

### Manual Testing Checklist
- [ ] Test on different screen sizes
- [ ] Verify form validations
- [ ] Check admin panel functionality
- [ ] Test file uploads
- [ ] Verify API endpoints

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - OS and version
   - Node.js version
   - Browser and version

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior

3. **Additional Context**
   - Screenshots if applicable
   - Console errors
   - Network requests

## ✨ Feature Requests

For feature requests, please:

1. Check existing issues first
2. Provide clear description
3. Explain the use case
4. Consider implementation complexity

## 📝 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No hardcoded values

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No sensitive data exposed
```

## 🔒 Security

### Security Guidelines
- Never commit sensitive data (passwords, API keys)
- Use environment variables for configuration
- Validate all user inputs
- Follow OWASP security guidelines

### Reporting Security Issues
For security vulnerabilities, please email: security@hsindia.com

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Bootstrap Documentation](https://getbootstrap.com/docs)

### Tools
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)

## 🤝 Community

### Communication
- Use GitHub Issues for discussions
- Be respectful and constructive
- Help others when possible

### Recognition
Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to HS India! 🎉
