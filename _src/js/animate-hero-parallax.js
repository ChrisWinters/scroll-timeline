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

export {
  AnimateHeroParallax
}
