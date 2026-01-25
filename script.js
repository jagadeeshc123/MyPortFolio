// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

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

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 5px 20px rgba(0, 102, 204, 0.2)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all skill categories and other elements
document.querySelectorAll('.skill-category, .highlight-item').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
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
