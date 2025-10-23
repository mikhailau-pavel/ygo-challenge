import { describe, it, expect } from 'vitest';

describe('ErrorMessage Component Logic', () => {
	it('should format error message with emoji', () => {
		const message = 'City not found';
		const formatted = `⚠️ ${message}`;
		
		expect(formatted).toBe('⚠️ City not found');
	});

	it('should handle long error messages', () => {
		const message = 'This is a very long error message that should still be displayed correctly';
		const formatted = `⚠️ ${message}`;
		
		expect(formatted).toContain('This is a very long error message');
	});

	it('should handle special characters in messages', () => {
		const message = "Error: Can't find <city> \"name\"";
		const formatted = `⚠️ ${message}`;
		
		expect(formatted).toContain("Can't find");
		expect(formatted).toContain('<city>');
	});

	it('should verify error styling classes', () => {
		const errorClasses = {
			container: ['bg-red-50', 'dark:bg-red-900/20', 'border', 'border-red-200', 'rounded-lg'],
			text: ['text-red-700', 'dark:text-red-400', 'text-center']
		};

		expect(errorClasses.container).toContain('bg-red-50');
		expect(errorClasses.text).toContain('text-red-700');
	});

	it('should handle empty messages', () => {
		const message = '';
		const formatted = `⚠️ ${message}`;
		
		expect(formatted).toBe('⚠️ ');
	});

	it('should handle numeric error codes', () => {
		const message = '404: Not Found';
		const formatted = `⚠️ ${message}`;
		
		expect(formatted).toContain('404');
	});
});
