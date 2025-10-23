# Testing Documentation

## Overview

The Weather Dashboard application includes comprehensive unit tests covering all critical components and functionality.

## Test Statistics

- **Total Test Files**: 7
- **Total Tests**: 38
- **Pass Rate**: 100%

## Test Coverage

### 1. API Endpoint Tests (`src/routes/api/weather/server.test.ts`)

Tests the weather API endpoint that fetches data from OpenWeatherMap.

**6 Tests:**
- ✅ Returns weather data for valid city
- ✅ Returns 400 error when city parameter is missing
- ✅ Returns 404 error for non-existent city
- ✅ Handles network errors gracefully
- ✅ Rounds temperature to nearest integer
- ✅ URL encodes city name in API request

**Example:**
```typescript
it('should return weather data for valid city', async () => {
  const mockWeatherData = {
    name: 'Berlin',
    main: { temp: 15.5 },
    weather: [{ main: 'Clouds', description: 'broken clouds' }]
  };

  const response = await GET(event);
  const data = await response.json();

  expect(data.temperature).toBe(16); // Rounds 15.5 to 16
});
```

### 2. WeatherCard Component Tests (`src/lib/components/WeatherCard.test.ts`)

Tests the weather emoji mapping logic for different weather conditions.

**8 Tests:**
- ✅ Returns correct emoji for Clear weather (☀️)
- ✅ Returns correct emoji for Clouds weather (☁️)
- ✅ Returns correct emoji for Rain weather (🌧️)
- ✅ Returns correct emoji for Snow weather (❄️)
- ✅ Returns correct emoji for Thunderstorm weather (⛈️)
- ✅ Returns default emoji for unknown condition (🌍)
- ✅ Handles multiple types of fog conditions (🌫️)
- ✅ Handles wind-related conditions (💨)

### 3. LoadingSpinner Component Tests (`src/lib/components/LoadingSpinner.test.ts`)

Validates the loading spinner configuration and styling.

**4 Tests:**
- ✅ Has spinner configuration
- ✅ Verifies spinner size classes
- ✅ Verifies spinner color classes
- ✅ Verifies animation class

### 4. ErrorMessage Component Tests (`src/lib/components/ErrorMessage.test.ts`)

Tests error message formatting and styling.

**6 Tests:**
- ✅ Formats error message with emoji
- ✅ Handles long error messages
- ✅ Handles special characters in messages
- ✅ Verifies error styling classes
- ✅ Handles empty messages
- ✅ Handles numeric error codes

### 5. ThemeToggle Component Tests (`src/lib/components/ThemeToggle.test.ts`)

Tests dark mode toggle logic and styling.

**5 Tests:**
- ✅ Toggles theme state
- ✅ Determines correct theme string
- ✅ Has correct button classes
- ✅ Has correct positioning
- ✅ Tracks dark mode state changes

### 6. Debounce Utility Tests (`src/lib/utils/debounce.test.ts`)

Tests the debounce utility function used for search input.

**8 Tests:**
- ✅ Delays function execution
- ✅ Only calls function once for multiple rapid calls
- ✅ Resets timer on each call
- ✅ Passes arguments to debounced function
- ✅ Handles different wait times
- ✅ Allows multiple independent debounced functions
- ✅ Handles zero wait time
- ✅ Calls debounced function correct number of times

### 7. Demo Spec Tests (`src/demo.spec.ts`)

Default test from SvelteKit template.

**1 Test:**
- ✅ Basic assertion test

## Running Tests

### Run All Server Tests
```bash
npm test
```

Or:
```bash
npx vitest run --project=server
```

### Run Tests in Watch Mode
```bash
npm run test:unit
```

### Run Specific Test File
```bash
npx vitest run src/lib/utils/debounce.test.ts
```

### Run Tests with Coverage
```bash
npx vitest run --coverage --project=server
```

## Test Architecture

### Testing Framework
- **Vitest** - Fast unit test framework
- **Happy DOM** - Lightweight DOM implementation

### Test Structure
```
src/
├── routes/
│   └── api/
│       └── weather/
│           ├── +server.ts
│           └── server.test.ts
└── lib/
    ├── components/
    │   ├── WeatherCard.svelte
    │   ├── WeatherCard.test.ts
    │   ├── LoadingSpinner.test.ts
    │   ├── ErrorMessage.test.ts
    │   └── ThemeToggle.test.ts
    └── utils/
        ├── debounce.ts
        └── debounce.test.ts
```

### Test Configuration

The project uses Vitest with two test configurations:

1. **Server Tests** (Node environment)
   - Location: `src/**/*.{test,spec}.{js,ts}`
   - Excludes: `src/**/*.svelte.{test,spec}.{js,ts}`
   - Environment: Node.js

2. **Client Tests** (Browser environment)
   - Location: `src/**/*.svelte.{test,spec}.{js,ts}`
   - Environment: Playwright browser
   - Note: Requires `npx playwright install` to run

## Writing New Tests

### API Endpoint Test Example
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './+server.js';

describe('My API Endpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return expected data', async () => {
    const response = await GET(event);
    const data = await response.json();
    
    expect(data).toHaveProperty('city');
  });
});
```

### Component Logic Test Example
```typescript
import { describe, it, expect } from 'vitest';

describe('My Component Logic', () => {
  it('should format data correctly', () => {
    const result = formatData('input');
    expect(result).toBe('expected');
  });
});
```

### Utility Function Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { myUtility } from './myUtility';

describe('My Utility Function', () => {
  it('should handle edge cases', () => {
    expect(myUtility(null)).toBe(undefined);
    expect(myUtility('')).toBe('');
    expect(myUtility('valid')).toBe('VALID');
  });
});
```

## Best Practices

### 1. Test Organization
- Group related tests in `describe` blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Mock Management
- Clear mocks in `beforeEach`
- Mock external dependencies (fetch, localStorage)
- Use `vi.fn()` for spy functions

### 3. Assertions
- Use specific matchers (`toBe`, `toEqual`, `toContain`)
- Test both success and error cases
- Include edge cases

### 4. Async Testing
- Use `async/await` for async operations
- Handle promise rejections with `expect().rejects`
- Test loading and error states

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
```

## Troubleshooting

### Common Issues

**Issue: Tests fail with "Cannot find module"**
```bash
# Solution: Ensure dependencies are installed
npm install
```

**Issue: Browser tests require Playwright installation**
```bash
# Solution: Install Playwright browsers
npx playwright install
```

**Issue: Fake timers not working**
```bash
# Solution: Use vi.useFakeTimers() and vi.restoreAllMocks()
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});
```

## Test Results Summary

```
✓ |server| src/lib/components/ThemeToggle.test.ts (5 tests)
✓ |server| src/lib/components/LoadingSpinner.test.ts (4 tests)
✓ |server| src/lib/components/ErrorMessage.test.ts (6 tests)
✓ |server| src/lib/utils/debounce.test.ts (8 tests)
✓ |server| src/routes/api/weather/server.test.ts (6 tests)
✓ |server| src/demo.spec.ts (1 test)
✓ |server| src/lib/components/WeatherCard.test.ts (8 tests)

Test Files  7 passed (7)
Tests  38 passed (38)
```

## Next Steps

Consider adding:
- Integration tests for full user flows
- E2E tests with Playwright
- Visual regression tests
- Performance tests
- Accessibility tests

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [SvelteKit Testing Guide](https://kit.svelte.dev/docs/testing)

