/**
 * MONIER MOHAMED MONIER - PORTFOLIO INTERACTIVITY
 * Senior Front-End Architecture: Vanilla JavaScript
 * Theme Manager, Canvas Particles, 3D Tilt, Carousel, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME MANAGER (DARK / LIGHT MODE & LOCALSTORAGE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('monier_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('monier_theme', theme);
    // Notify canvas to adjust particle colors
    if (window.updateCanvasTheme) {
      window.updateCanvasTheme(theme);
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  /* ==========================================================================
     2. NAVBAR: SCROLL EFFECTS & ACTIVE SECTION HIGHLIGHTING
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header background
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Active navigation link highlighting via IntersectionObserver
  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => navObserver.observe(section));

  /* ==========================================================================
     3. MOBILE HAMBURGER MENU
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    hamburgerBtn?.classList.add('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    mobileMenu?.classList.add('open');
    mobileMenu?.setAttribute('aria-hidden', 'false');
  }

  function closeMobileMenu() {
    hamburgerBtn?.classList.remove('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
  }

  hamburgerBtn?.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when any mobile link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (mobileMenu?.classList.contains('open')) {
      if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  /* ==========================================================================
     4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ==========================================================================
     5. DESKTOP MOUSE SPOTLIGHT & 3D PROJECT CARD TILT
     ========================================================================== */
  const isPointerFine = window.matchMedia('(pointer: fine)').matches;
  const spotlight = document.getElementById('cursor-spotlight');

  if (isPointerFine && spotlight) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  // 3D Tilt on Project Cards (Desktop only)
  const tiltCards = document.querySelectorAll('[data-tilt]');

  if (isPointerFine && tiltCards.length > 0) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -8;
        const rotateY = ((cardX - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==========================================================================
     6. AMBIENT PARTICLES CANVAS (VANILLA JS + HIGH PERFORMANCE)
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let currentTheme = htmlElement.getAttribute('data-theme') || 'dark';

    const particles = [];
    // Adjust density based on screen width
    const particleCount = Math.floor(Math.min(window.innerWidth / 18, 55));

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (currentTheme === 'dark') {
          ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity * 0.7})`;
        } else {
          ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity * 0.3})`;
        }
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineOpacity = (1 - dist / 110) * (currentTheme === 'dark' ? 0.15 : 0.06);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    window.updateCanvasTheme = function(newTheme) {
      currentTheme = newTheme;
    };
  }

  /* ==========================================================================
     7. TESTIMONIALS CAROUSEL
     ========================================================================== */
  const track = document.getElementById('carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const dots = Array.from(dotsContainer ? dotsContainer.querySelectorAll('.dot') : []);

  let currentIndex = 0;
  let autoSlideTimer = null;
  const slideCount = slides.length;

  function updateCarousel(index) {
    if (slideCount === 0) return;
    currentIndex = (index + slideCount) % slideCount;

    if (track) {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCarousel(currentIndex + 1);
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentIndex - 1);
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
      startAutoSlide();
    });
  });

  const carouselWrapper = document.getElementById('testimonials-carousel-container');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
    carouselWrapper.addEventListener('mouseleave', startAutoSlide);
  }

  // Initialize carousel & auto slide
  updateCarousel(0);
  startAutoSlide();

  /* ==========================================================================
     8. CONTACT FORM VALIDATION & INTERACTIVE STATE
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  function clearErrors() {
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (subjectError) subjectError.textContent = '';
    if (messageError) messageError.textContent = '';
    if (formAlert) {
      formAlert.style.display = 'none';
      formAlert.className = 'form-alert';
      formAlert.textContent = '';
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Name Validation
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      // Email Validation
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please provide a valid email format (e.g. name@domain.com).';
        isValid = false;
      }

      // Subject Validation
      if (!subjectInput.value.trim()) {
        subjectError.textContent = 'Please provide a subject.';
        isValid = false;
      }

      // Message Validation
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please write your message.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message should be at least 10 characters.';
        isValid = false;
      }

      if (isValid) {
        const submitBtn = document.getElementById('btn-submit-form');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          if (formAlert) {
            formAlert.className = 'form-alert success';
            formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you, ' + nameInput.value.trim() + '! Your message has been sent successfully. I will get back to you shortly.';
            formAlert.style.display = 'flex';
          }

          contactForm.reset();
        }, 800);
      } else {
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please correct the highlighted errors before submitting.';
          formAlert.style.display = 'flex';
        }
      }
    });
  }

  /* ==========================================================================
     9. DYNAMIC YEAR
     ========================================================================== */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
