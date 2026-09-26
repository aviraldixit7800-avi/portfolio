const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;


/* ================================
   MOBILE NAVIGATION
================================ */

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');

    menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    document.body.classList.toggle(
      'menu-open',
      isOpen
    );
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');

      menuToggle.setAttribute(
        'aria-expanded',
        'false'
      );

      document.body.classList.remove('menu-open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav.classList.remove('is-open');

      menuToggle.setAttribute(
        'aria-expanded',
        'false'
      );

      document.body.classList.remove('menu-open');
    }
  });
}


/* ================================
   SMOOTH ANCHOR SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  });
});


/* ================================
   SCROLL PROGRESS BAR
================================ */

const progressBar = document.createElement('div');

progressBar.className = 'scroll-progress';

document.body.appendChild(progressBar);

function updateProgress() {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener(
  'scroll',
  updateProgress,
  { passive: true }
);

updateProgress();


/* ================================
   SMART NAVBAR
================================ */

const topbar = document.querySelector('.topbar');

function updateNavbar() {
  if (!topbar) return;

  if (window.scrollY > 40) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
}

window.addEventListener(
  'scroll',
  updateNavbar,
  { passive: true }
);

updateNavbar();


/* ================================
   ACTIVE NAV SECTION
================================ */

const sections = document.querySelectorAll(
  'main section[id]'
);

const navLinks = document.querySelectorAll(
  '.nav a[href^="#"]'
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;

      navLinks.forEach((link) => {
        const active =
          link.getAttribute('href') === `#${id}`;

        link.classList.toggle(
          'active',
          active
        );
      });
    });
  },
  {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* ================================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(
  '.section-heading, ' +
  '.about-card, ' +
  '.timeline-item, ' +
  '.skill-card, ' +
  '.project-card, ' +
  '.activity-card, ' +
  '.achievement-card, ' +
  '.contact-copy, ' +
  '.contact-form'
);

if (!prefersReducedMotion) {
  revealElements.forEach((element, index) => {
    element.classList.add('reveal');

    element.style.setProperty(
      '--reveal-delay',
      `${Math.min(index * 45, 300)}ms`
    );
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('revealed');

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add('revealed');
  });
}


/* ================================
   HERO MOUSE PARALLAX
================================ */

const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

if (
  hero &&
  heroVisual &&
  !prefersReducedMotion &&
  window.matchMedia('(pointer: fine)').matches
) {
  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
      rect.height -
      0.5;

    heroVisual.style.transform = `
      translate3d(${x * 10}px, ${y * 10}px, 0)
    `;
  });

  hero.addEventListener('mouseleave', () => {
    heroVisual.style.transform =
      'translate3d(0, 0, 0)';
  });
}


/* ================================
   PREMIUM CARD TILT
================================ */

const tiltCards = document.querySelectorAll(
  '.project-card, .skill-card, .activity-card'
);

if (
  !prefersReducedMotion &&
  window.matchMedia('(pointer: fine)').matches
) {
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        (event.clientY - rect.top) /
        rect.height;

      const rotateX = (0.5 - y) * 5;
      const rotateY = (x - 0.5) * 5;

      card.style.transform = `
        perspective(900px)
        translateY(-6px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ================================
   CURSOR GLOW
================================ */

if (
  !prefersReducedMotion &&
  window.matchMedia('(pointer: fine)').matches
) {
  const cursorGlow = document.createElement('div');

  cursorGlow.className = 'cursor-glow';

  document.body.appendChild(cursorGlow);

  window.addEventListener(
    'mousemove',
    (event) => {
      cursorGlow.style.transform =
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    },
    { passive: true }
  );
}


/* ================================
   MAGNETIC BUTTONS
================================ */

const magneticElements = document.querySelectorAll(
  '.btn, .nav-cta, .back-to-top'
);

if (
  !prefersReducedMotion &&
  window.matchMedia('(pointer: fine)').matches
) {
  magneticElements.forEach((element) => {
    element.addEventListener('mousemove', (event) => {
      const rect =
        element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      element.style.transform =
        `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });
}


/* ================================
   BACK TO TOP
================================ */

const backToTop =
  document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener(
    'scroll',
    () => {
      backToTop.classList.toggle(
        'visible',
        window.scrollY > 700
      );
    },
    { passive: true }
  );
}


/* ================================
   COPY EMAIL
================================ */

const emailLinks =
  document.querySelectorAll(
    'a[href^="mailto:"]'
  );

emailLinks.forEach((link) => {
  link.addEventListener('contextmenu', () => {
    const email =
      link
        .getAttribute('href')
        ?.replace('mailto:', '');

    if (!email) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
  });
});


/* ================================
   CONTACT FORM
================================ */

// const contactForm = document.getElementById("contact-form");
// const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            formStatus.className = "form-status error";
            return;
        }

        const subject = encodeURIComponent(
            `Portfolio message from ${name}`
        );

        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `${message}`
        );

        window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&to=aviraldixit7800@gmail.com&su=${subject}&body=${body}`,
            "_blank"
        );

        formStatus.textContent =
            "Gmail is opening with your message ready to send.";

        formStatus.className = "form-status success";
    });
}

/* ================================
   IMAGE FALLBACK
================================ */

document.querySelectorAll('img').forEach((image) => {
  image.addEventListener('error', () => {
    image.classList.add('image-error');
  });
});


/* ================================
   HERO INTRO
================================ */

window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
});


/* ================================
   CURRENT YEAR
================================ */

const yearElements =
  document.querySelectorAll('[data-current-year]');

yearElements.forEach((element) => {
  element.textContent =
    new Date().getFullYear();
});

const portraitCard = document.querySelector('.portrait-card');

if (portraitCard && !prefersReducedMotion) {
  portraitCard.addEventListener('mouseenter', () => {
    portraitCard.classList.add('photo-fall');
  });

  portraitCard.addEventListener('mouseleave', () => {
    portraitCard.classList.remove('photo-fall');
  });
}