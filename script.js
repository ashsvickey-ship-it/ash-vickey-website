document.getElementById("year").textContent = new Date().getFullYear();

// Subtle reveal on scroll for campaign log entries — respects reduced motion.
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced && "IntersectionObserver" in window) {
  const entries = document.querySelectorAll(".case, .stream-card");

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

// Hero headline: show a "|" only between segments that share a line.
// Any segment that wraps to a new line loses its separator and gets a
// forced break, so no line ever starts or ends with a stray "|".
(function () {
  const line = document.querySelector(".hero-line");
  if (!line) return;
  const segs = Array.from(line.querySelectorAll(".seg"));

  function layout() {
    line.querySelectorAll(".brk").forEach((b) => b.remove());
    segs.forEach((s) => s.classList.remove("line-start"));
    for (let i = 1; i < segs.length; i++) {
      const prevTop = segs[i - 1].getBoundingClientRect().top;
      const curTop = segs[i].getBoundingClientRect().top;
      if (curTop - prevTop > 2) {
        const brk = document.createElement("span");
        brk.className = "brk";
        brk.setAttribute("aria-hidden", "true");
        line.insertBefore(brk, segs[i]);
        segs[i].classList.add("line-start");
      }
    }
  }

  let frame;
  function schedule() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  }

  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  window.addEventListener("resize", schedule);
})();
