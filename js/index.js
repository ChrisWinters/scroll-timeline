(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  // Observer Options.
  const ObserverOptions = {
    root: null,
    threshold: 0,
    rootMargin: "-10%",
  };

  // Animate Hero Background and Title Container.
  const animateHeroParallax = () => {
    // Get Hero elements.
    const hero = document.querySelector(".hero");
    const heroTitle = document.querySelector(".hero-title");
    const heroBackground = document.querySelector(".hero > .background");

    // Hero Background.
    heroBackground.animate({
      transform: ['none', 'translateY(30%)']}, {
      duration: 10000,
      fill: 'both',
      timeline: new ScrollTimeline({
          scrollOffsets: [{target: hero, edge: 'end', clamp: true},
                          {target: hero, clamp: true}],
          fill: 'both',
      })
    });

    // Title Container.
    heroTitle.animate([
      {transform: 'translateY(-50%)'},
      {transform: 'translateY(-90%)'}], {
        duration: 10000,
        fill: 'both',
        timeline: new ScrollTimeline({
            scrollOffsets: [{target: heroTitle, edge: 'end', clamp: true},
                            {target: heroTitle, clamp: true}],
            fill: 'both',
      })
    });
  };

  // Get Container.
  const heroParallax = document.getElementById("hero-parallax");

  // Observer for Hero Parallax.
  const ObserverHeroParallax = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Only run when intersecting.
        if (!entry.isIntersecting) {
          return
        }

        // Run Hero Parallax.
        animateHeroParallax();

        // Clear observer.
        animatedNumberObserver.unobserve(entry.target);
      });
    },
    ObserverOptions
  );

  // Get all sections.
  const SectionTags = document.querySelectorAll("section");

  // Observer for section fade-ins.
  const ObserverSectionFadeIn = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Only run when intersecting.
        if (!entry.isIntersecting) {
          return
        }

        // Inject .fade-in class.
        entry.target.classList.toggle("fade-in");

        // Clear observer.
        sectionObserver.unobserve(entry.target);
      });
    },
    ObserverOptions
  );

  // Animate numbers counting up.
  const animateNumbers = (obj, start, end, duration) => {
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      obj.innerHTML = Math.floor(progress * (end - start) + start);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  // Get all numbers.
  const NumbersToAnimate = document.getElementsByClassName("animate-number");

    // Observer for animated numbers.
  const ObserverAnimatedNumbers = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Only run when intersecting.
        if (!entry.isIntersecting) {
          return
        }

        // Get number from HTML.
        const number = entry.target.innerHTML;

        // Run Animate Number.
        animateNumbers(entry.target, number / 2, number, 1000);

        // Clear observer.
        animatedNumberObserver.unobserve(entry.target);
      });
    },
    ObserverOptions
  );

  // Hero Parallax Observer.
  ObserverHeroParallax.observe(heroParallax);

  // Loop through <section> tags.
  SectionTags.forEach(section => {
    // Section Fade-in Observer.
    ObserverSectionFadeIn.observe(section);
  });

  // Loop through animated number classes.
  Array.from(NumbersToAnimate).forEach((number) => {
    // Animated Numbers Observer.
    ObserverAnimatedNumbers.observe(number);
  });

}));
