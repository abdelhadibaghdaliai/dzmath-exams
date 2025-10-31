document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ORIGINAL SCRIPT (Scroll Animations & Navbar) ---

    // Create a new Intersection Observer to handle scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is visible on screen
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS transition
                entry.target.classList.add('is-visible');
                // Stop observing the element so the animation only runs once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Select all elements that should be animated on scroll
    const elementsToAnimate = document.querySelectorAll('h2, .step, .subject-card');
    
    // Observe each element
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll'); // Add the initial hidden state
        observer.observe(element);
    });

    // Staggered animation for grid items
    const staggeredItems = document.querySelectorAll('.steps-container > .step, .subjects-grid > .subject-card');
    staggeredItems.forEach((item, index) => {
        // Calculate a delay based on the item's index in its container
        // We use the modulo operator (%) to reset the index for each grid
        const gridColumnCount = 3; // Your original layout seems to have 3 columns
        const delay = (index % gridColumnCount) * 150; 
        item.style.setProperty('--delay', `${delay}ms`);
    });

    // Navbar Toggle for mobile
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('is-active');
            navbarToggle.classList.toggle('is-active'); // For 'X' animation if added
        });
    }

    // --- 2. ADDED SCRIPT (Language Switching) ---

    // Define all translations
    const translations = {
        en: {
            home_title: "DZMATH-EXAMS - Master Your University Exams",
            logo: "DZMATH-EXAMS",
            nav_home: "Home",
            nav_subjects: "Subjects",
            nav_about: "About",
            hero_title: "Master Your University Exams",
            hero_subtitle: "The ultimate platform for Algerian university students to find, practice, and ace their math and science exams.",
            hero_cta: "Get Started",
            how_it_works_title: "How It Works",
            step1_title: "Find Your Exam",
            step1_desc: "Browse our extensive library of past exams from various universities across Algeria.",
            step2_title: "Practice Online",
            step2_desc: "Take exams directly in our interactive interface, simulating real test conditions.",
            step3_title: "Master the Solution",
            step3_desc: "Unlock detailed, step-by-step solutions to understand the logic and master the concepts.",
            subjects_title: "Featured Subjects",
            subject_analyse1_title: "Analyse 1",
            subject_analyse1_desc: "Limits, series, and integration.",
            subject_analyse2_title: "Analyse 2",
            subject_analyse2_desc: "Limits, series, and integration.",
            subject_algebra_title: "Algebra",
            subject_algebra_desc: "Coming Soon",
            subject_algo_title: "Algorithms and Data Structures",
            subject_algo_desc: "Coming Soon",
            footer_created_by: "Created by BAGHDALI ABDELHADI",
            footer_copyright: "&copy; 2025 DZMATH-EXAMS. All rights reserved.",
            // For analysis pages (when you create them)
            analysis1_page_title: "Analysis 1 Exams - DZMATH-EXAMS",
            analysis2_page_title: "Analysis 2 Exams - DZMATH-EXAMS",
            analysis1_title: "Analysis 1 Exams",
            analysis2_title: "Analysis 2 Exams",
            select_exam_en: "Please select an exam to view (English versions):",
            select_exam_fr: "Please select an exam to view (French versions):"
        },
        fr: {
            home_title: "DZMATH-EXAMS - Maîtrisez vos examens universitaires",
            logo: "DZMATH-EXAMS",
            nav_home: "Accueil",
            nav_subjects: "Matières",
            nav_about: "À propos",
            hero_title: "Maîtrisez vos examens universitaires",
            hero_subtitle: "La plateforme ultime pour les étudiants universitaires algériens pour trouver, pratiquer et réussir leurs examens de maths et de sciences.",
            hero_cta: "Commencer",
            how_it_works_title: "Comment ça marche",
            step1_title: "Trouvez votre examen",
            step1_desc: "Parcourez notre vaste bibliothèque d'anciens examens de diverses universités à travers l'Algérie.",
            step2_title: "Pratiquez en ligne",
            step2_desc: "Passez des examens directement dans notre interface interactive, simulant les conditions réelles du test.",
            step3_title: "Maîtrisez la solution",
            step3_desc: "Débloquez des solutions détaillées, étape par étape, pour comprendre la logique et maîtriser les concepts.",
            subjects_title: "Matières à la une",
            subject_analyse1_title: "Analyse 1",
            subject_analyse1_desc: "Limites, séries et intégration.",
            subject_analyse2_title: "Analyse 2",
            subject_analyse2_desc: "Limites, séries et intégration.",
            subject_algebra_title: "Algèbre",
            subject_algebra_desc: "Bientôt disponible",
            subject_algo_title: "Algorithmes et Structures de Données",
            subject_algo_desc: "Bientôt disponible",
            footer_created_by: "Créé par BAGHDALI ABDELHADI",
            footer_copyright: "&copy; 2025 DZMATH-EXAMS. Tous droits réservés.",
            // For analysis pages (when you create them)
            analysis1_page_title: "Examens Analyse 1 - DZMATH-EXAMS",
            analysis2_page_title: "Examens Analyse 2 - DZMATH-EXAMS",
            analysis1_title: "Examens d'Analyse 1",
            analysis2_title: "Examens d'Analyse 2",
            select_exam_en: "Veuillez sélectionner un examen à consulter (versions anglaises):",
            select_exam_fr: "Veuillez sélectionner un examen à consulter (versions françaises):"
        }
    };

    // Get language switcher elements
    const langSwitcherButton = document.getElementById('lang-switcher');
    const translatableElements = document.querySelectorAll('[data-lang]');
    const enContent = document.getElementById('lang-en-content');
    const frContent = document.getElementById('lang-fr-content');

    // Get language from storage or default to 'en'
    let currentLang = localStorage.getItem('dzmath_lang') || 'en';

    /**
     * Applies translations and toggles content visibility.
     * @param {string} lang - 'en' or 'fr'
     */
    function setLanguage(lang) {
        if (lang !== 'en' && lang !== 'fr') {
            lang = 'en'; // Default
        }
        
        currentLang = lang;
        localStorage.setItem('dzmath_lang', lang);
        document.documentElement.lang = lang; // Set HTML lang attribute

        // 1. Translate all static text
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'TITLE') {
                    element.textContent = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // 2. Toggle content blocks (for analysis pages)
        if (enContent && frContent) {
            if (lang === 'fr') {
                enContent.classList.add('hidden');
                frContent.classList.remove('hidden');
            } else {
                enContent.classList.remove('hidden');
                frContent.classList.add('hidden');
            }
        }
    }

    /**
     * Toggles the language between 'en' and 'fr'
     */
    function toggleLanguage() {
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        setLanguage(newLang);
    }

    // Add click listener to the button
    if (langSwitcherButton) {
        langSwitcherButton.addEventListener('click', toggleLanguage);
    }

    // Apply language on initial page load
    setLanguage(currentLang);

});