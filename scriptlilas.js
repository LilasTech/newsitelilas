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
  // CAROUSEL (AUTO CONTÍNUO + DRAG)
  // =========================
  const carousel = document.querySelector('.carousel');
  const btnLeft = document.querySelector('.arrow.left');
  const btnRight = document.querySelector('.arrow.right');

  if (carousel) {

    carousel.innerHTML += carousel.innerHTML;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let speed = 0.5;

    carousel.scrollLeft = carousel.scrollWidth / 2;

    function autoScroll() {
      if (!isDragging) {
        carousel.scrollLeft += speed;

        const halfWidth = carousel.scrollWidth / 2;

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

    carousel.addEventListener('mouseup', () => isDragging = false);
    carousel.addEventListener('mouseleave', () => isDragging = false);

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

    carousel.addEventListener('touchend', () => isDragging = false);

    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const walk = e.touches[0].pageX - startX;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  // =========================
  // NAV AUTO INFINITO + DRAG
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
    }, { threshold: 0.3 });

    promessas.forEach((item) => observer.observe(item));

    navTrack.addEventListener('mousedown', (e) => {
      isDraggingNav = true;
      startXNav = e.pageX;
      scrollLeftNav = navTrack.scrollLeft;
    });

    navTrack.addEventListener('mouseup', () => isDraggingNav = false);
    navTrack.addEventListener('mouseleave', () => isDraggingNav = false);

    navTrack.addEventListener('mousemove', (e) => {
      if (!isDraggingNav) return;
      e.preventDefault();
      const walk = e.pageX - startXNav;
      navTrack.scrollLeft = scrollLeftNav - walk;
    });

    navTrack.addEventListener('touchstart', (e) => {
      isDraggingNav = true;
      startXNav = e.touches[0].pageX;
      scrollLeftNav = navTrack.scrollLeft;
    });

    navTrack.addEventListener('touchend', () => isDraggingNav = false);

    navTrack.addEventListener('touchmove', (e) => {
      if (!isDraggingNav) return;
      const walk = e.touches[0].pageX - startXNav;
      navTrack.scrollLeft = scrollLeftNav - walk;
    });
  }

  // =========================
  // FEEDBACKS AUTO INFINITO + DRAG MANUAL
  // =========================
  const feedbacksRoll = document.querySelector('.feedbacksroll');

  if (feedbacksRoll) {

    feedbacksRoll.innerHTML += feedbacksRoll.innerHTML;

    let scrollSpeed = 0.5;
    let isDraggingFeedback = false;
    let startXFeedback = 0;
    let scrollLeftFeedback = 0;

    const originalWidth = feedbacksRoll.scrollWidth / 2;

    function autoScrollFeedbacks() {

      if (!isDraggingFeedback) {
        feedbacksRoll.scrollLeft += scrollSpeed;

        if (feedbacksRoll.scrollLeft >= originalWidth) {
          feedbacksRoll.scrollLeft -= originalWidth;
        }

        if (feedbacksRoll.scrollLeft <= 0) {
          feedbacksRoll.scrollLeft += originalWidth;
        }
      }

      requestAnimationFrame(autoScrollFeedbacks);
    }

    autoScrollFeedbacks();

    feedbacksRoll.addEventListener('mousedown', (e) => {
      isDraggingFeedback = true;
      startXFeedback = e.pageX;
      scrollLeftFeedback = feedbacksRoll.scrollLeft;
    });

    feedbacksRoll.addEventListener('mouseup', () => isDraggingFeedback = false);
    feedbacksRoll.addEventListener('mouseleave', () => isDraggingFeedback = false);

    feedbacksRoll.addEventListener('mousemove', (e) => {
      if (!isDraggingFeedback) return;
      e.preventDefault();
      const walk = e.pageX - startXFeedback;
      feedbacksRoll.scrollLeft = scrollLeftFeedback - walk;
    });

    feedbacksRoll.addEventListener('touchstart', (e) => {
      isDraggingFeedback = true;
      startXFeedback = e.touches[0].pageX;
      scrollLeftFeedback = feedbacksRoll.scrollLeft;
    });

    feedbacksRoll.addEventListener('touchend', () => isDraggingFeedback = false);

    feedbacksRoll.addEventListener('touchmove', (e) => {
      if (!isDraggingFeedback) return;
      const walk = e.touches[0].pageX - startXFeedback;
      feedbacksRoll.scrollLeft = scrollLeftFeedback - walk;
    });
  }

});

window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  const heroSection = document.querySelector('.hero');
  
  if (window.scrollY > (heroSection.offsetHeight - 50)) {
    nav.classList.add('nav-active');
  } else {
    nav.classList.remove('nav-active');
  }
});
