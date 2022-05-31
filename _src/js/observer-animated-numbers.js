import { AnimateNumbers } from '../../_src/js/animate-numbers'

// Observer for animated numbers.
export const ObserverAnimatedNumbers = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Only run when intersecting.
      if (!entry.isIntersecting) {
        return
      }

      // Get number from HTML.
      const number = entry.target.innerHTML;

      // Run Animate Number.
      AnimateNumbers(entry.target, number / 2, number, 1000);

      // Clear observer.
      ObserverAnimatedNumbers.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.2,
    rootMargin: "30px"
  },
);
