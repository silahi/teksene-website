// main.js - JS principal du site Teksene
// Scroll fluide, menu actif, animations, anti-robot formulaire

document.addEventListener('DOMContentLoaded', function () {
  // Scroll fluide et activation du lien courant
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  // Activation du lien courant au scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', function () {
    let scrollPos = window.scrollY + 80;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Animation légère sur scroll (apparition)
  const revealElements = document.querySelectorAll('.service, .step, .membre');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.92;
    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Génération et vérification anti-robot
  const antiRobotQuestion = document.getElementById('antiRobotQuestion');
  const antiRobotInput = document.getElementById('antiRobot');
  let antiRobotAnswer = null;
  function generateAntiRobot() {
    // Génère une question simple aléatoire
    const a = Math.floor(Math.random() * 6) + 2; // 2 à 7
    const b = Math.floor(Math.random() * 5) + 2; // 2 à 6
    antiRobotAnswer = a + b;
    antiRobotQuestion.textContent = `Combien font ${a} + ${b} ?`;
    antiRobotInput.value = '';
  }
  generateAntiRobot();

  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Vérification anti-robot
    if (parseInt(antiRobotInput.value, 10) !== antiRobotAnswer) {
      formMessage.textContent = 'Réponse anti-robot incorrecte.';
      formMessage.style.color = '#d32f2f';
      generateAntiRobot();
      return;
    }
    // Vérification des champs
    const nom = contactForm.nom.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if (!nom || !email || !message) {
      formMessage.textContent = 'Merci de remplir tous les champs.';
      formMessage.style.color = '#d32f2f';
      return;
    }
    // Email simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.textContent = 'Adresse email invalide.';
      formMessage.style.color = '#d32f2f';
      return;
    }
    // Simulation d'envoi (à intégrer avec EmailJS, Formspree, etc.)
    formMessage.textContent = 'Envoi en cours...';
    formMessage.style.color = '#2563eb';
    setTimeout(() => {
      formMessage.textContent = 'Votre message a bien été envoyé !';
      formMessage.style.color = '#388e3c';
      contactForm.reset();
      generateAntiRobot();
    }, 1200);
  });
});

// Apparition animée (fade-in) pour les éléments révélés
const style = document.createElement('style');
style.innerHTML = `
  .service, .step, .membre {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
  }
  .service.visible, .step.visible, .membre.visible {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style); 