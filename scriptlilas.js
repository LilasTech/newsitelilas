document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // FAQ TOGGLE (usando classe active)
  // =========================
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // =========================
  // REVEAL ON SCROLL
  // =========================
  function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // ======================================================
  // FUNÇÃO PADRÃO PARA SCROLL INFINITO + DRAG FLUIDO
  // ======================================================
  function setupInfiniteScroll(container, speed = 0.5) {

    if (!container) return;

    // DUPLICAÇÃO REAL PARA LOOP INFINITO
    container.innerHTML += container.innerHTML;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const halfWidth = container.scrollWidth / 2;

    // começa no meio
    container.scrollLeft = halfWidth;

    function autoScroll() {

      if (!isDragging) {
        container.scrollLeft += speed;

        // LOOP INFINITO REAL (sem salto visual)
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft -= halfWidth;
        }

        if (container.scrollLeft <= 0) {
          container.scrollLeft += halfWidth;
        }
      }

      requestAnimationFrame(autoScroll);
    }

    autoScroll();

    // =========================
    // DRAG FLUIDO (POINTER EVENTS)
    // =========================
    container.addEventListener("pointerdown", (e) => {
      isDragging = true;
      container.setPointerCapture(e.pointerId);
      startX = e.clientX;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("pointerup", (e) => {
      isDragging = false;
      container.releasePointerCapture(e.pointerId);
    });

    container.addEventListener("pointerleave", () => {
      isDragging = false;
    });

    container.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const walk = e.clientX - startX;
      container.scrollLeft = scrollLeft - walk;
    });

  }

  // =========================
  // CAROUSEL
  // =========================
  const carousel = document.querySelector('.carousel');
  const btnLeft = document.querySelector('.arrow.left');
  const btnRight = document.querySelector('.arrow.right');

  if (carousel) {

    setupInfiniteScroll(carousel, 0.5);

    if (btnRight) {
      btnRight.addEventListener('click', () => {
        carousel.scrollLeft += 250;
      });
    }

    if (btnLeft) {
      btnLeft.addEventListener('click', () => {
        carousel.scrollLeft -= 250;
      });
    }
  }

  // =========================
  // NAV TRACK
  // =========================
  const navTrack = document.querySelector('.nav-track');

  if (navTrack) {
    setupInfiniteScroll(navTrack, 0.6);
  }

  // =========================
  // FEEDBACKS
  // =========================
  const feedbacksRoll = document.querySelector('.feedbacksroll');

  if (feedbacksRoll) {
    setupInfiniteScroll(feedbacksRoll, 1.5);
  }

  // =========================
  // PROMESSAS (mantido igual)
  // =========================
  const promessas = document.querySelectorAll('.promessas');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {

        const delay = index * 250;

        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  promessas.forEach((item) => {
    observer.observe(item);
  });

});
