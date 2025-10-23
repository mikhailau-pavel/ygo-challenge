import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('Debounce Utility', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should delay function execution', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 500);

		debouncedFn();

		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(500);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should only call function once for multiple rapid calls', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 500);

		debouncedFn();
		debouncedFn();
		debouncedFn();
		debouncedFn();

		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(500);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should reset timer on each call', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 500);

		debouncedFn();
		vi.advanceTimersByTime(300);

		debouncedFn();
		vi.advanceTimersByTime(300);

		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(200);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should pass arguments to debounced function', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 500);

		debouncedFn('arg1', 'arg2', 123);

		vi.advanceTimersByTime(500);

		expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
	});

	it('should handle different wait times', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn();

		vi.advanceTimersByTime(500);
		expect(mockFn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(500);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should allow multiple independent debounced functions', () => {
		const mockFn1 = vi.fn();
		const mockFn2 = vi.fn();
		const debouncedFn1 = debounce(mockFn1, 500);
		const debouncedFn2 = debounce(mockFn2, 500);

		debouncedFn1();
		debouncedFn2();

		vi.advanceTimersByTime(500);

		expect(mockFn1).toHaveBeenCalledTimes(1);
		expect(mockFn2).toHaveBeenCalledTimes(1);
	});

	it('should handle zero wait time', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 0);

		debouncedFn();

		vi.advanceTimersByTime(0);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should call debounced function correct number of times', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 500);

		debouncedFn();
		debouncedFn();

		vi.advanceTimersByTime(500);

		expect(mockFn).toHaveBeenCalledTimes(1);

		debouncedFn();

		vi.advanceTimersByTime(500);

		expect(mockFn).toHaveBeenCalledTimes(2);
	});
});

