import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const BuggyComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary tests', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    const header = screen.getByRole('heading', { level: 1 });
    expect(header.textContent).toBe('Test error');

    const image = screen.getByAltText('pikachu') as HTMLImageElement;
    expect(image).contains;
    expect(image.src).toContain('Pikachu.svg');
  });

  test('Logs error to console', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ErrorBoundary caught an error:'),
      expect.any(Error),
      expect.any(Object)
    );
  });
});
