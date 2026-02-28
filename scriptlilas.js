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

  // =========================
  // CAROUSEL (AUTO CONTÍNUO + DRAG)  ✅ ATUALIZADO (SEM PULO)
  // =========================
  const carousel = document.querySelector('.carousel');
  const btnLeft = document.querySelector('.arrow.left');
  const btnRight = document.querySelector('.arrow.right');

  if (carousel) {

    // DUPLICA os cards para loop infinito real
    carousel.innerHTML += carousel.innerHTML;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let speed = 0.5;

    // começa já na metade
    carousel.scrollLeft = carousel.scrollWidth / 2;

    function autoScroll() {
      if (!isDragging) {
        carousel.scrollLeft += speed;

        const halfWidth = carousel.scrollWidth / 2;

        // LOOP INFINITO REAL (sem salto visual)
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft -= halfWidth;
        }

        if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft += halfWidth;
        }
      }

      requestAnimationFrame(autoScroll);
    }

    autoScroll();

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

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseup', () => {
      isDragging = false;
    });

    carousel.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const walk = e.pageX - startX;
      carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchend', () => {
      isDragging = false;
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const walk = e.touches[0].pageX - startX;
      carousel.scrollLeft = scrollLeft - walk;
    });

  }

  // =========================
  // NAV AUTO INFINITO + DRAG REAL
  // =========================
  const navTrack = document.querySelector('.nav-track');

  if (navTrack) {

    let isDraggingNav = false;
    let startXNav = 0;
    let scrollLeftNav = 0;
    let navSpeed = 0.5;

    navTrack.scrollLeft = navTrack.scrollWidth / 2;

    function autoScrollNav() {

      if (!isDraggingNav) {
        navTrack.scrollLeft += navSpeed;

        if (navTrack.scrollLeft >= navTrack.scrollWidth) {
          navTrack.scrollLeft = navTrack.scrollWidth / 2;
        }

        if (navTrack.scrollLeft <= 0) {
          navTrack.scrollLeft = navTrack.scrollWidth / 2;
        }
      }

      requestAnimationFrame(autoScrollNav);
    }

    autoScrollNav();

    // ================= leftdepromessas =================
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

    // ================= DRAG MOUSE =================
    navTrack.addEventListener('mousedown', (e) => {
      isDraggingNav = true;
      navTrack.classList.add('dragging');
      startXNav = e.pageX;
      scrollLeftNav = navTrack.scrollLeft;
    });

    navTrack.addEventListener('mouseup', () => {
      isDraggingNav = false;
      navTrack.classList.remove('dragging');
    });

    navTrack.addEventListener('mouseleave', () => {
      isDraggingNav = false;
      navTrack.classList.remove('dragging');
    });

    navTrack.addEventListener('mousemove', (e) => {
      if (!isDraggingNav) return;
      e.preventDefault();
      const walk = e.pageX - startXNav;
      navTrack.scrollLeft = scrollLeftNav - walk;
    });

    // ================= TOUCH MOBILE =================
    navTrack.addEventListener('touchstart', (e) => {
      isDraggingNav = true;
      startXNav = e.touches[0].pageX;
      scrollLeftNav = navTrack.scrollLeft;
    });

    navTrack.addEventListener('touchend', () => {
      isDraggingNav = false;
    });

    navTrack.addEventListener('touchmove', (e) => {
      if (!isDraggingNav) return;
      const walk = e.touches[0].pageX - startXNav;
      navTrack.scrollLeft = scrollLeftNav - walk;
    });

  }

});

// =========================
// FEEDBACKS AUTO INFINITO
// =========================
const feedbacksRoll = document.querySelector('.feedbacksroll');

if (feedbacksRoll) {

  feedbacksRoll.innerHTML += feedbacksRoll.innerHTML;

  let scrollSpeed = 0.7;
  let isHovering = false;

  feedbacksRoll.scrollLeft = feedbacksRoll.scrollWidth / 2;

  function autoScrollFeedbacks() {

    if (!isHovering) {
      feedbacksRoll.scrollLeft += scrollSpeed;

      const halfWidth = feedbacksRoll.scrollWidth / 2;

      if (feedbacksRoll.scrollLeft >= feedbacksRoll.scrollWidth - feedbacksRoll.clientWidth) {
        feedbacksRoll.scrollLeft -= halfWidth;
      }

      if (feedbacksRoll.scrollLeft <= 0) {
        feedbacksRoll.scrollLeft += halfWidth;
      }
    }

    requestAnimationFrame(autoScrollFeedbacks);
  }

  feedbacksRoll.addEventListener('mouseenter', () => {
    isHovering = true;
  });

  feedbacksRoll.addEventListener('mouseleave', () => {
    isHovering = false;
  });

  autoScrollFeedbacks();
}
