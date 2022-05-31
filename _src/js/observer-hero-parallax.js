import { AnimateHeroParallax } from '../../_src/js/animate-hero-parallax'

// Observer for Hero Parallax.
export const ObserverHeroParallax = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Only run when intersecting.
      if (!entry.isIntersecting) {
        return
      }

      // Run Hero Parallax.
      AnimateHeroParallax();

      // Clear observer.
      ObserverHeroParallax.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0
  },
);
