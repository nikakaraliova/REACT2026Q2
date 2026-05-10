import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import ErrorButton from './ErrorButton';

describe('ErrorButton & ErrorBoundary Integration', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Display Simulate Error button', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText('Simulate Error');
    expect(button).toBeDefined();
  });

  test('Activate ErrorBoundary after click', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText('Simulate Error');

    fireEvent.click(button);

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('You Simulated Error!')).toBeDefined();
    expect(screen.getByAltText('pikachu')).toBeDefined();
  });
});
