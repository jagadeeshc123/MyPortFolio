// Particle Canvas Animation for Hero Section
const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle class
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
      this.fadeDelay = Math.random() * 600 + 100;
      this.fadeStart = Date.now() + this.fadeDelay;
      this.fadingOut = false;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speed = Math.random() * 0.6 + 0.3;
      this.opacity = Math.random() * 0.3 + 0.2;
      this.radius = Math.random() * 1.5 + 0.5;
      this.fadeDelay = Math.random() * 600 + 100;
      this.fadeStart = Date.now() + this.fadeDelay;
      this.fadingOut = false;
    }

    update() {
      this.y -= this.speed;
      
      // Twinkling effect
      if (Date.now() > this.fadeStart) {
        if (!this.fadingOut) {
          this.fadingOut = true;
          this.fadeDelay = Math.random() * 600 + 100;
          this.fadeStart = Date.now() + this.fadeDelay;
        } else {
          this.fadingOut = false;
          this.fadeDelay = Math.random() * 600 + 100;
          this.fadeStart = Date.now() + this.fadeDelay;
        }
      }

      if (this.fadingOut) {
        this.opacity -= 0.005;
        if (this.opacity <= 0.15) this.opacity = 0.15;
      } else {
        this.opacity += 0.005;
        if (this.opacity >= 0.5) this.opacity = 0.5;
      }

      // Reset particle if it goes off screen
      if (this.y < 0) {
        this.reset();
        this.y = canvas.height;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(0, 212, 255, 0.3)';
    }
  }

  // Create particles
  const particleCount = 60;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }

  animate();
}

// About Section Canvas Animation
const aboutCanvas = document.getElementById('aboutCanvas');
const aboutCtx = aboutCanvas ? aboutCanvas.getContext('2d') : null;

if (aboutCanvas && aboutCtx) {
  function resizeAboutCanvas() {
    aboutCanvas.width = aboutCanvas.offsetWidth;
    aboutCanvas.height = aboutCanvas.offsetHeight;
  }
  
  resizeAboutCanvas();
  window.addEventListener('resize', resizeAboutCanvas);

  class AboutParticle {
    constructor() {
      this.reset();
      this.x = Math.random() * aboutCanvas.width;
      this.y = Math.random() * aboutCanvas.height;
    }

    reset() {
      this.x = Math.random() * aboutCanvas.width;
      this.y = Math.random() * aboutCanvas.height;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.25 + 0.15;
      this.radius = Math.random() * 1.2 + 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      this.opacity += (Math.random() - 0.5) * 0.006;
      if (this.opacity > 0.4) this.opacity = 0.4;
      if (this.opacity < 0.1) this.opacity = 0.1;

      if (this.x < 0) this.x = aboutCanvas.width;
      if (this.x > aboutCanvas.width) this.x = 0;
      if (this.y < 0) this.y = aboutCanvas.height;
      if (this.y > aboutCanvas.height) this.y = 0;
    }

    draw() {
      aboutCtx.beginPath();
      aboutCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      aboutCtx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      aboutCtx.fill();
      aboutCtx.shadowBlur = 3;
      aboutCtx.shadowColor = 'rgba(0, 212, 255, 0.2)';
    }
  }

  const aboutParticleCount = 40;
  const aboutParticles = [];
  
  for (let i = 0; i < aboutParticleCount; i++) {
    aboutParticles.push(new AboutParticle());
  }

  function animateAbout() {
    aboutCtx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height);
    aboutCtx.shadowBlur = 0;
    
    aboutParticles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animateAbout);
  }

  animateAbout();
}

// Unified animation function for Skills, Resume, and Contact sections
function createSectionAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas ? canvas.getContext('2d') : null;

  if (!canvas || !ctx) return;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class SectionParticle {
    constructor() {
      this.reset();
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.25 + 0.15;
      this.radius = Math.random() * 1.2 + 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      this.opacity += (Math.random() - 0.5) * 0.006;
      if (this.opacity > 0.4) this.opacity = 0.4;
      if (this.opacity < 0.1) this.opacity = 0.1;

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.fill();
      ctx.shadowBlur = 3;
      ctx.shadowColor = 'rgba(0, 212, 255, 0.2)';
    }
  }

  const particleCount = 40;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new SectionParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize animations for each section
createSectionAnimation('skillsCanvas');
createSectionAnimation('resumeCanvas');
createSectionAnimation('contactCanvas');

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Input validation functions
function validateName(name) {
  return name.trim().length >= 2;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validateSubject(subject) {
  return subject.trim().length >= 3;
}

function validateMessage(message) {
  return message.trim().length >= 10;
}

// Clear error messages
function clearErrors() {
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('subjectError').textContent = '';
  document.getElementById('messageError').textContent = '';
}

// Show error message
function showError(fieldId, message) {
  document.getElementById(fieldId).textContent = message;
}

// Form submission handler
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  clearErrors();
  successMessage.textContent = '';
  let isValid = true;

  // Validate name
  if (!validateName(nameInput.value)) {
    showError('nameError', 'Please enter a valid name (at least 2 characters)');
    isValid = false;
  }

  // Validate email
  if (!validateEmail(emailInput.value)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }

  // Validate subject
  if (!validateSubject(subjectInput.value)) {
    showError('subjectError', 'Please enter a subject (at least 3 characters)');
    isValid = false;
  }

  // Validate message
  if (!validateMessage(messageInput.value)) {
    showError('messageError', 'Please enter a message (at least 10 characters)');
    isValid = false;
  }

  if (!isValid) return;

  // Formspree endpoint
  const FORM_ENDPOINT = 'https://formspree.io/f/mvzagkbr';

  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    subject: subjectInput.value.trim(),
    message: messageInput.value.trim(),
  };

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    successMessage.textContent = 'Message sent! Thank you for reaching out.';
    successMessage.style.color = '#00d97e';
    contactForm.reset();
  } catch (error) {
    console.error('Form submit error:', error);
    successMessage.textContent = 'Could not send message right now. Please try again later.';
    successMessage.style.color = '#ff4757';
  } finally {
    setTimeout(() => {
      successMessage.textContent = '';
    }, 5000);
  }
});

// Real-time validation
nameInput.addEventListener('blur', () => {
  if (nameInput.value && !validateName(nameInput.value)) {
    showError('nameError', 'Please enter at least 2 characters');
  } else {
    document.getElementById('nameError').textContent = '';
  }
});

emailInput.addEventListener('blur', () => {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    showError('emailError', 'Please enter a valid email address');
  } else {
    document.getElementById('emailError').textContent = '';
  }
});

subjectInput.addEventListener('blur', () => {
  if (subjectInput.value && !validateSubject(subjectInput.value)) {
    showError('subjectError', 'Please enter at least 3 characters');
  } else {
    document.getElementById('subjectError').textContent = '';
  }
});

messageInput.addEventListener('blur', () => {
  if (messageInput.value && !validateMessage(messageInput.value)) {
    showError('messageError', 'Please enter at least 10 characters');
  } else {
    document.getElementById('messageError').textContent = '';
  }
});

// Check if all fields are filled and make form transparent
function checkFormCompletion() {
  const allFieldsFilled = 
    nameInput.value.trim().length > 0 &&
    emailInput.value.trim().length > 0 &&
    subjectInput.value.trim().length > 0 &&
    messageInput.value.trim().length > 0;
  
  if (allFieldsFilled) {
    contactForm.classList.add('transparent');
  } else {
    contactForm.classList.remove('transparent');
  }
}

// Add event listeners to check form completion
nameInput.addEventListener('input', checkFormCompletion);
emailInput.addEventListener('input', checkFormCompletion);
subjectInput.addEventListener('input', checkFormCompletion);
messageInput.addEventListener('input', checkFormCompletion);

// Smooth scrolling for navigation links (already handled by HTML, but adding extra support)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
});

// Enhanced scroll effect to navbar with parallax
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    navbar.style.boxShadow = '0 5px 20px rgba(0, 102, 204, 0.2)';
    navbar.style.backdropFilter = 'blur(15px)';
  } else {
    navbar.style.boxShadow = 'none';
    navbar.style.backdropFilter = 'blur(10px)';
  }

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  const heroGlass = document.querySelector('.hero-glass-container');
  
  if (hero && scrollPosition < window.innerHeight) {
    if (heroGlass) {
      heroGlass.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      heroGlass.style.opacity = 1 - scrollPosition / 800;
    }
  }

  // Animate navbar links on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link, index) => {
    if (scrollPosition > 50) {
      link.style.transform = 'translateY(0)';
      link.style.transition = `all 0.3s ease ${index * 0.1}s`;
    }
  });
});

// Enhanced fade in animation on scroll with staggering
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all skill categories and other elements with enhanced effects
document.querySelectorAll('.skill-category, .highlight-item, .contact-item').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px) scale(0.95)';
  el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});

// Resume Download Handler
const downloadResumeBtn = document.getElementById('downloadResume');
if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Jagadeesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Add mouse movement parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 50;
    const moveY = (mouseY - 0.5) * 50;
    
    const heroContent = document.querySelector('.hero-content-wrapper');
    if (heroContent && window.scrollY < window.innerHeight) {
      heroContent.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.3}px)`;
    }
  });
}

// Animated counting effect for numbers (if you have any)
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Add ripple effect to buttons
document.querySelectorAll('.button, .cta-button').forEach((button) => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add tilt effect to skill cards
document.querySelectorAll('.skill-category, .highlight-item').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `translateY(-15px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// Smooth reveal for sections on scroll
const revealSections = document.querySelectorAll('section');
const revealSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

revealSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

// Add typing effect to hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle-new');
if (heroSubtitle) {
  const originalText = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  let charIndex = 0;
  
  const typeWriter = () => {
    if (charIndex < originalText.length) {
      heroSubtitle.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    }
  };
  
  setTimeout(typeWriter, 1000);
}
