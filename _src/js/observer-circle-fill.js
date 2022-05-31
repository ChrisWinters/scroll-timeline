// Observer for section fade-ins.
export const ObserverCircleFill = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Only run when intersecting.
      if (!entry.isIntersecting) {
        return
      }

      // Inject .fill-in class.
      entry.target.classList.toggle("fill-in");

      // Set fille amount.
      let fillAmount = '0%';

      // Set fill amount from value.
      if (entry.target.attributes[1].nodeValue) {
        fillAmount = (100 - entry.target.attributes[1].nodeValue) + '%';
      }

      // Custom animation control.
      entry.target.animate([
        {top: fillAmount}], {
          duration: 1000,
          fill: 'both'
      });

      // Clear observer.
      ObserverCircleFill.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "100px"
  },
);
