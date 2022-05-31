import { ObserverHeroParallax } from '../_src/js/observer-hero-parallax'
import { ObserverSectionFadeIn } from '../_src/js/observer-section-fade-in'
import { ObserverCircleFill } from '../_src/js/observer-circle-fill'
import { ObserverAnimatedNumbers } from '../_src/js/observer-animated-numbers'

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
