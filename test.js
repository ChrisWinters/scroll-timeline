const heroParallax = document.getElementById("hero-parallax");
const sections = document.querySelectorAll("section");
const numbers = document.getElementsByClassName("animate-number");
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero-title");
const heroBackground = document.querySelector(".hero > .background");

// Observer Options.
const options = {
  root: null,
  threshold: 0,
  rootMargin: "-10%",
};

// Animate numbers counting up.
const animateNumber = (obj, start, end, duration) => {
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
}

// Animate Hero Background and Title Container.
const animateHeroParallax = () => {
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
}

// Observer for Hero Parallax.
const heroParallaxObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Only run when intersecting.
      if (!entry.isIntersecting) {
        return;
      }

      // Run Hero Parallax.
      animateHeroParallax();

      // Clear observer.
      animateNumberObserver.unobserve(entry.target);
    })
  },
  options
)

// Run Observer for Hero.
heroParallaxObserver.observe(heroParallax);

// Observer for animated numbers.
const animateNumberObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Only run when intersecting.
      if (!entry.isIntersecting) {
        return;
      }

      // Get number from HTML.
      const number = entry.target.innerHTML;

      // Run Animate Number.
      animateNumber(entry.target, number / 2, number, 1000);

      // Clear observer.
      animateNumberObserver.unobserve(entry.target);
    })
  },
  options
)

// Loop through animated number classes.
Array.from(numbers).forEach((number) => {
  animateNumberObserver.observe(number);
});

// Observer for section fade-ins.
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Only run when intersecting.
      if (!entry.isIntersecting) {
        return;
      }

      // Inject .fade-in class.
      entry.target.classList.toggle("fade-in");

      // Clear observer.
      sectionObserver.unobserve(entry.target);
    })
  },
  options
);

// Loop through sections.
sections.forEach(section => {
  sectionObserver.observe(section);
});
