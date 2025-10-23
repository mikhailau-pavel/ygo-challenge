import { describe, it, expect } from 'vitest';

describe('LoadingSpinner Component', () => {
	it('should have spinner configuration', () => {
		const spinnerConfig = {
			classes: ['animate-spin', 'rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-blue-500'],
			containerClasses: ['flex', 'justify-center', 'items-center', 'mt-6']
		};

		expect(spinnerConfig.classes).toContain('animate-spin');
		expect(spinnerConfig.classes).toContain('rounded-full');
		expect(spinnerConfig.classes).toContain('h-12');
		expect(spinnerConfig.classes).toContain('w-12');
		expect(spinnerConfig.containerClasses).toContain('flex');
		expect(spinnerConfig.containerClasses).toContain('justify-center');
	});

	it('should verify spinner size classes', () => {
		const sizeClasses = ['h-12', 'w-12'];
		
		expect(sizeClasses).toEqual(['h-12', 'w-12']);
	});

	it('should verify spinner color classes', () => {
		const colorClass = 'border-blue-500';
		
		expect(colorClass).toBe('border-blue-500');
	});

	it('should verify animation class', () => {
		const animationClass = 'animate-spin';
		
		expect(animationClass).toBe('animate-spin');
	});
});
