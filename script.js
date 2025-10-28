// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animation des barres du hamburger
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Fermer le menu mobile quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            
            // Réinitialiser les animations après navigation
            setTimeout(() => {
                initializeAnimations();
                initializeSectionReveal();
                initializeStatsAnimation();
            }, 100);
        });
    });

    // Fermer le menu mobile en cliquant en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
});

// Scroll smooth pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.05,
    rootMargin: '50px 0px -20px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes et éléments à animer
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .testimonial, .stat, .process-step, .service-detail');
    
    animatedElements.forEach(el => {
        // Ne pas animer si déjà visible
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        }
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialiser au chargement ET après navigation
document.addEventListener('DOMContentLoaded', initializeAnimations);
window.addEventListener('load', initializeAnimations);

// Formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation basique
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#e9ecef';
            }
        });
        
        // Validation email
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (isValid) {
            // Simulation d'envoi du formulaire
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                submitBtn.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    contactForm.reset();
                    alert('Merci pour votre message ! Nous vous recontacterons dans les plus brefs délais.');
                }, 2000);
            }, 1500);
        } else {
            alert('Veuillez remplir tous les champs obligatoires correctement.');
        }
    });
}

// Compteur animé pour les statistiques
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start) + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer pour les statistiques
function initializeStatsAnimation() {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target.querySelector('h3');
                if (statElement && !statElement.classList.contains('animated')) {
                    statElement.classList.add('animated');
                    const endValue = parseInt(statElement.textContent);
                    animateCounter(statElement, 0, endValue, 2000);
                }
            }
        });
    }, { threshold: 0.3 });

    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

document.addEventListener('DOMContentLoaded', initializeStatsAnimation);
window.addEventListener('load', initializeStatsAnimation);

// Effet parallax léger sur le hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Navigation sticky avec effet
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll vers le bas
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll vers le haut
        header.style.transform = 'translateY(0)';
    }
    
    // Ajouter une classe pour l'effet de fond
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Style pour l'effet scrolled du header
const style = document.createElement('style');
style.textContent = `
    .header {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
`;
document.head.appendChild(style);

// Lazy loading pour les images (si vous ajoutez des vraies images plus tard)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Effet de typing pour le texte hero (optionnel)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Mode sombre/clair (fonctionnalité bonus)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Charger le thème sauvegardé
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Smooth reveal pour les sections
function initializeSectionReveal() {
    const revealSections = document.querySelectorAll('section');
    const revealSection = function(entries, observer) {
        const [entry] = entries;
        
        if (!entry.isIntersecting) return;
        
        entry.target.classList.remove('section-hidden');
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.1,
    });

    revealSections.forEach(function(section) {
        // Ne pas cacher si déjà visible
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.remove('section-hidden');
        } else {
            section.classList.add('section-hidden');
            sectionObserver.observe(section);
        }
    });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', initializeSectionReveal);
window.addEventListener('load', initializeSectionReveal);

// Style pour les sections cachées - plus subtil
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(2rem);
        transition: all 0.5s ease;
    }
    
    /* Section visible par défaut */
    section {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(sectionStyle);

// Bouton de retour en haut
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(backToTopButton);

// Style pour le bouton de retour en haut
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    }
    
    .back-to-top.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        background: var(--secondary-color);
        transform: translateY(-5px);
    }
`;
document.head.appendChild(backToTopStyle);

// Logique pour afficher/masquer le bouton
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Action du bouton
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fonction globale pour réinitialiser toutes les animations
function reinitializeAllAnimations() {
    // Attendre que le DOM soit complètement chargé
    setTimeout(() => {
        initializeAnimations();
        initializeSectionReveal();
        initializeStatsAnimation();
    }, 200);
}

// Réinitialiser après le chargement complet de la page
window.addEventListener('load', reinitializeAllAnimations);

// Réinitialiser quand on revient sur la page (back/forward)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        reinitializeAllAnimations();
    }
});

// Forcer l'affichage immédiat des éléments visibles au chargement
window.addEventListener('DOMContentLoaded', function() {
    // Forcer l'affichage des éléments déjà visibles
    const allElements = document.querySelectorAll('.service-card, .project-card, .testimonial, .stat, .process-step, .service-detail, section');
    allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.classList.remove('section-hidden');
        }
    });
});

console.log('🏗️ Site Innova Toiture - Scripts chargés avec succès !');