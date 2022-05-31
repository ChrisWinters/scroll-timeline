// Observer for section fade-ins.
export const ObserverSectionFadeIn = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Only run when intersecting.
      if (!entry.isIntersecting) {
        return
      }

      // Inject .fade-in class.
      entry.target.classList.toggle("fade-in");

      // Clear observer.
      ObserverSectionFadeIn.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.2
  },
);
