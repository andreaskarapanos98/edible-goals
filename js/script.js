// ============ PRELOADER ============
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => preloader.classList.add('loaded'), 300);
});

// ============ NAVBAR SCROLL STATE ============
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

function handleScrollEffects() {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('show', window.scrollY > 500);
}
window.addEventListener('scroll', handleScrollEffects, { passive: true });
handleScrollEffects();

// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ============ SCROLL REVEAL ANIMATIONS ============
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-pop');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ============ GALLERY FILTER ============
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hide', !match);
    });
  });
});

// ============ LIGHTBOX ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;
let visibleItems = [];

function refreshVisibleItems() {
  visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
}

function openLightbox(item) {
  refreshVisibleItems();
  currentIndex = visibleItems.indexOf(item);
  showLightboxImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxImage() {
  const item = visibleItems[currentIndex];
  const img = item.querySelector('img');
  const title = item.querySelector('.gallery-overlay h4')?.textContent || '';
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = title;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showLightboxImage();
});
lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showLightboxImage();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNext.click();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
});

// ============ TESTIMONIAL SLIDER ============
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('testimonialDots');
const cards = document.querySelectorAll('.testimonial-card');
let activeSlide = 0;
let autoSlideTimer;

cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  activeSlide = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  restartAutoSlide();
}

function nextSlide() {
  goToSlide((activeSlide + 1) % cards.length);
}

function restartAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(nextSlide, 5500);
}
restartAutoSlide();

// ============ CONTACT FORM -> MAILTO ============
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const occasion = document.getElementById('occasion').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Cake Order Inquiry${occasion ? ' — ' + occasion : ''}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nOccasion: ${occasion || 'N/A'}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:test@test.com?subject=${subject}&body=${body}`;
});

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
