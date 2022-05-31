(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  // Animate Hero Background and Title Container.
  const AnimateHeroParallax = () => {
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

  // Observer for Hero Parallax.
  const ObserverHeroParallax = new IntersectionObserver(entries => {
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
        ObserverSectionFadeIn.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.2
    },
  );

  // Observer for section fade-ins.
  const ObserverCircleFill = new IntersectionObserver(entries => {
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

  // Animate numbers counting up.
  const AnimateNumbers = (obj, start, end, duration) => {
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

  // Get Hero container.
  const heroParallax = document.getElementById("hero-parallax");

  // Get all sections to fade-in.
  const SectionTags = document.querySelectorAll("section");

  // Get all circles to fill.
  const CirclesToFill = document.getElementsByClassName("circle-fill");

  // Get all numbers.
  const NumbersToAnimate = document.getElementsByClassName("animate-number");

  // Loop through .circle-fill classes.
  Array.from(CirclesToFill).forEach((circle) => {
    // Circle Fill Observer.
    ObserverCircleFill.observe(circle);
  });

  // Hero Parallax Observer.
  ObserverHeroParallax.observe(heroParallax);

  // Loop through <section> tags.
  SectionTags.forEach(section => {
    // Section Fade-in Observer.
    ObserverSectionFadeIn.observe(section);
  });

  // Loop through .animate-number classes
  Array.from(NumbersToAnimate).forEach((element) => {
    // Section Fade-in Observer.
    ObserverSectionFadeIn.observe(element);
  });

  // Loop through .animate-number classes.
  Array.from(NumbersToAnimate).forEach((element) => {
    // Animated Numbers Observer.
    ObserverAnimatedNumbers.observe(element);
  });

}));
