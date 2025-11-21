# 🤝 Contributing to 5SCENT

Thank you for contributing to 5SCENT! This guide helps you get started with development.

---

## 📋 Before You Start

1. **Read** `GETTING_STARTED.md` for local setup
2. **Understand** `ARCHITECTURE_OVERVIEW.md` for project structure
3. **Review** `API_DOCUMENTATION.md` for API endpoints
4. **Check** existing issues and PRs to avoid duplicates

---

## 🌿 Branch Naming Convention

Use clear, descriptive branch names:

```bash
# Feature branches
git checkout -b feature/hero-carousel
git checkout -b feature/add-wishlist

# Bug fixes
git checkout -b fix/navbar-alignment
git checkout -b fix/api-500-error

# Documentation
git checkout -b docs/api-guide
git checkout -b docs/deployment

# Chores
git checkout -b chore/update-dependencies
git checkout -b chore/cleanup-css

# Format: type/description (lowercase, hyphens, no spaces)
```

---

## 💻 Development Workflow

### 1. Create Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 2. Make Changes
```bash
# Make your code changes
# Test thoroughly
# Keep commits atomic and focused
```

### 3. Commit Changes
```bash
# Stage changes
git add .

# Commit with clear message
git commit -m "feat: Add carousel component"

# Push to repository
git push origin feature/your-feature-name
```

### 4. Create Pull Request
- Go to GitHub/GitLab/Bitbucket
- Create PR from your branch to `main`
- Write clear description of changes
- Link related issues
- Request code review

### 5. Address Feedback
```bash
# Make requested changes
git add .
git commit -m "refactor: Improve carousel performance"
git push origin feature/your-feature-name
```

### 6. Merge
- After approval, merge PR
- Delete feature branch

---

## 📝 Commit Message Guidelines

**Format:** `type: description`

### Types
```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Code style (formatting, missing semicolons, etc)
refactor: Code refactoring
perf:     Performance improvement
test:     Tests
chore:    Maintenance, dependencies
ci:       CI/CD configuration
```

### Examples
```bash
git commit -m "feat: Add product search functionality"
git commit -m "fix: Fix cart calculation bug"
git commit -m "docs: Update API documentation"
git commit -m "style: Format React components"
git commit -m "refactor: Extract shared logic into utils"
git commit -m "perf: Optimize image loading"
git commit -m "test: Add unit tests for ProductCard"
git commit -m "chore: Update dependencies"
```

### Good vs Bad
```
❌ BAD:   "update stuff"
✅ GOOD:  "feat: Add filter to product listing"

❌ BAD:   "fix"
✅ GOOD:  "fix: Fix navbar dropdown positioning"

❌ BAD:   "changes"
✅ GOOD:  "refactor: Simplify API call logic"
```

---

## 🎯 Code Standards

### JavaScript/TypeScript
```typescript
// ✅ Use TypeScript for type safety
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// ✅ Use functional components
export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return <div>{product.name}</div>;
};

// ✅ Use proper naming
const [isLoading, setIsLoading] = useState(false);

// ❌ Avoid
const [load, setLoad] = useState(false);

// ✅ Use hooks properly
const [data, setData] = useState(null);
useEffect(() => {
  // Fetch data
}, []);

// ✅ Use Tailwind for styling
<div className="flex items-center justify-between p-4 bg-white rounded-lg">

// ❌ Avoid inline styles
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
```

### PHP/Laravel
```php
// ✅ Use type hints
public function getProduct(int $id): Product
{
    return Product::findOrFail($id);
}

// ✅ Use proper naming
public function getTopSellingProducts()
{
    return Product::withCount('orders')
        ->orderByDesc('orders_count')
        ->limit(6)
        ->get();
}

// ✅ Use relationships
public function products()
{
    return $this->hasMany(Product::class);
}

// ❌ Avoid
public function getproducts()
{
    return DB::table('products')->get();
}

// ✅ Return meaningful responses
return response()->json(['success' => true, 'data' => $products]);

// ❌ Avoid
return $products;
```

---

## 🧪 Testing

### Frontend
```bash
# Run tests
npm test

# Test with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Backend
```bash
# Run tests
php artisan test

# Run specific test file
php artisan test --filter=ProductControllerTest

# Run with coverage
php artisan test --coverage
```

### Before Submitting PR
- [ ] All tests pass
- [ ] No console errors/warnings
- [ ] Code formatted properly
- [ ] No hardcoded values
- [ ] No sensitive data in code

---

## 🔍 Pull Request Checklist

Before requesting review:

- [ ] Branch created from latest `main`
- [ ] All tests pass locally
- [ ] Code follows project standards
- [ ] No console errors/warnings
- [ ] Commits have clear messages
- [ ] PR title is descriptive
- [ ] PR description explains changes
- [ ] Related issues are linked
- [ ] Screenshots/videos if UI changes
- [ ] No sensitive data exposed

### PR Title Format
```
feat: Add product filtering
fix: Fix cart total calculation
docs: Update API documentation
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Code refactoring

## Related Issues
Closes #123

## How to Test
Steps to verify the changes:
1. Step 1
2. Step 2
3. Step 3

## Screenshots (if applicable)
[Add images for UI changes]

## Checklist
- [ ] Tests pass
- [ ] Code follows project style
- [ ] Documentation updated
- [ ] No breaking changes
```

---

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description** - What's the issue?
2. **Steps to Reproduce** - How to recreate it?
3. **Expected Behavior** - What should happen?
4. **Actual Behavior** - What actually happened?
5. **Screenshots/Video** - Visual evidence
6. **Environment** - Browser, OS, versions
7. **Error Messages** - Any console errors?

---

## 🚀 Feature Requests

When suggesting features:

1. **Title** - Clear, concise description
2. **Use Case** - Why is this needed?
3. **Expected Behavior** - How should it work?
4. **Examples** - Reference implementations
5. **Additional Context** - Relevant information

---

## 📚 Code Review Guidelines

### As a Reviewer
- [ ] Does code follow project standards?
- [ ] Are tests adequate?
- [ ] Is documentation updated?
- [ ] Are there performance issues?
- [ ] Are there security concerns?
- [ ] Is code readable and maintainable?
- [ ] Are there better ways to implement?

### Be Constructive
```
❌ "This is wrong"
✅ "Consider using a ternary operator here for better readability"

❌ "Bad code"
✅ "I think this would be more efficient using the map function"

❌ "Change this"
✅ "Could we extract this into a separate component?"
```

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Laravel Docs](https://laravel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🆘 Getting Help

1. **Documentation** - Check relevant .md files
2. **Existing Issues** - Search closed/open issues
3. **Discussion** - Use discussions tab
4. **Code Comments** - Ask in PR comments
5. **Chat** - Contact team members

---

## 📋 Common Tasks

### Adding a New Page
1. Create component in `frontend/components/`
2. Add route in `frontend/app/` 
3. Add navigation link
4. Write documentation
5. Create PR with tests

### Adding a New API Endpoint
1. Create migration (if needed)
2. Create controller method
3. Add route in `routes/api.php`
4. Document in `API_DOCUMENTATION.md`
5. Add tests
6. Create PR

### Updating Dependencies
1. Update `package.json` or `composer.json`
2. Run `npm install` or `composer install`
3. Test thoroughly
4. Document breaking changes
5. Create PR

---

## ⚠️ Important Notes

- **Never commit** `.env` files or secrets
- **Always test** before submitting PR
- **Keep PRs focused** - one feature per PR
- **Write clear commit messages** - future you will thank you
- **Ask questions** - don't hesitate to ask for guidance
- **Be respectful** - assume good intent

---

## 🎉 Thank You!

Your contributions help make 5SCENT better. Thank you for being part of the team!

**Happy coding!** 🚀
