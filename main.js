const counters = document.querySelectorAll("[data-count]");
const revealNodes = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav a");
const trackedSections = document.querySelectorAll("section[id]");

const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  const duration = 1000;
  const start = performance.now();

  const frame = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    element.textContent = String(Math.round(target * progress));
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  };

  requestAnimationFrame(frame);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.6,
  }
);

counters.forEach((counter) => counterObserver.observe(counter));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
  }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const match = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", match);
      });
    });
  },
  {
    threshold: 0.45,
  }
);

trackedSections.forEach((section) => sectionObserver.observe(section));
