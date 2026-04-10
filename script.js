(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  revealEls.forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 50, 260)}ms`;
    io.observe(el);
  });

  const parallaxEls = document.querySelectorAll("[data-parallax]");
  const onScroll = () => {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = Number(el.getAttribute("data-parallax")) || 0.05;
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
})();