document.getElementById("year").textContent = new Date().getFullYear();

// Subtle reveal on scroll for campaign log entries — respects reduced motion.
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced && "IntersectionObserver" in window) {
    const entries = document.querySelectorAll(".log-entry, .stream-card");

  entries.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(
        (observed) => {
                observed.forEach((entry) => {
                          if (entry.isIntersecting) {
                                      entry.target.style.opacity = "1";
                                      entry.target.style.transform = "translateY(0)";
                                      observer.unobserve(entry.target);
                          }
                });
        },
    { threshold: 0.15 }
      );

  entries.forEach((el) => observer.observe(el));
}
