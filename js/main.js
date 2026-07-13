(function () {
  "use strict";

  // ---------- Nav scroll state ----------
  const navEl = document.getElementById("nav");
  const updateNavScroll = () => {
    navEl.classList.toggle("scrolled", window.scrollY > 10);
  };
  updateNavScroll();
  window.addEventListener("scroll", updateNavScroll, { passive: true });

  // ---------- Mobile nav ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("mobile-open");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("mobile-open");
    });
  });

  // ---------- Scroll reveals ----------
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));

    // Safety net: never let content stay invisible if the observer misses
    // an element (e.g. layout not settled yet on first paint).
    window.addEventListener("load", () => {
      setTimeout(() => {
        revealEls.forEach((el) => el.classList.add("in-view"));
        observer.disconnect();
      }, 2500);
    });
  }

  // ---------- Contact form ----------
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.textContent = "Sent";
      form.reset();
      setTimeout(() => (btn.textContent = original), 2200);
    });
  }
})();
