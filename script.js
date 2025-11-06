document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ORIGINAL SCRIPT (Scroll Animations & Navbar) ---
    // (Note: Scroll animations are implied by #subjects link, but the script portion
    // for mobile nav is essential.)
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', () => {
            // Simple logic for mobile toggle (implementation in CSS is assumed/not present but logic is here)
            navbarLinks.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
    }

    // --- 2. ADDED SCRIPT (Language Switching) ---

    // Define all translations
    const translations = {
        en: {
            home_title: "ExamsNexus - Master Your University Exams",
            logo: "ExamsNexus",
            nav_home: "Home",
            nav_subjects: "Subjects",
            nav_about: "About",
            hero_title: "Welcome to ExamsNexus",
            // UPDATED: Added the new descriptive sentence
            hero_subtitle: "The ultimate platform for Algerian university students to find, practice, and ace their math and science exams. We are currently offering <strong>USTHB exams for L1 Computer Science</strong>, with a vision to expand to all universities and modules. We're just getting started!",
            hero_cta: "Get Started",
            hero_upload: "Contribute & Upload Your Exam",
            subjects_title: "Featured Subjects",
            subject_analyse1_title: "Analyse 1",
            subject_analyse1_desc: "Comprehensive collection of <strong>17 exams</strong>. Limits, series, and integration.",
            subject_analyse2_title: "Analyse 2",
            subject_analyse2_desc: "Comprehensive collection of <strong>17 exams</strong>. Limits, series, and integration.",
            subject_algebra_title: "Algebra",
            subject_algebra_desc: "Coming Soon",
            subject_algo_title: "Algorithms and Data Structures",
            subject_algo_desc: "Coming Soon",
            footer_created_by: "Created by BAGHDALI ABDELHADI",
            footer_copyright: "&copy; 2025 ExamsNexus. All rights reserved.",
            // For analysis pages (when you create them)
            analysis1_page_title: "Analysis 1 Exams - ExamsNexus",
            analysis2_page_title: "Analysis 2 Exams - ExamsNexus",
            analysis1_title: "Analysis 1 Exams",
            analysis2_title: "Analysis 2 Exams",
            select_exam_en: "Please select an exam to view (English versions):",
            select_exam_fr: "Please select an exam to view (French versions):",
            // New "About" Page Translations
            about_page_title: "About - ExamsNexus",
            about_title: "About ExamsNexus",
            about_mission_title: "Our Mission",
            about_mission_text: "Our vision is to be the number one platform in Algeria for archiving and presenting university exams in a modern, engaging, and non-boring way. We want to move away from static files and create an interactive, helpful resource for all students.",
            about_story_title: "Our Story",
            about_story_text: "ExamsNexus started with a simple idea: make studying for exams easier. We are currently offering <strong>17 exams for Analysis 1</strong> and <strong>17 exams for Analysis 2</strong> from the <strong>University of USTHB (L1 Computer Science)</strong>. This is just the beginning. Our goal is to rapidly expand to include more modules, more universities, and more resources to help you succeed.",
            about_contribute_title: "Help Us Grow!",
            about_contribute_text: "This project relies on contributions from students like you! If you have university exams (with or without solutions), please upload them. We will do our best to convert them into interactive web pages for everyone to benefit from.",
            // New "How It Works" Section Translations
            how_it_works_title: "How It Works",
            step_1_title: "Find Your Module",
            step_1_desc: "Browse our growing list of university modules, starting with Analysis 1 and 2 from USTHB.",
            step_2_title: "Select Your Exam",
            step_2_desc: "Choose an exam from the list. We provide both French and English versions where available.",
            step_3_title: "Start Practicing",
            step_3_desc: "Engage with the interactive content to test your knowledge and prepare for your university session."
        },
        fr: {
            home_title: "ExamsNexus - Maîtrisez vos examens universitaires",
            logo: "ExamsNexus",
            nav_home: "Accueil",
            nav_subjects: "Matières",
            nav_about: "À Propos",
            hero_title: "Bienvenue sur ExamsNexus",
            // UPDATED: Added the new descriptive sentence
            hero_subtitle: "La plateforme ultime pour les étudiants universitaires algériens afin de trouver, pratiquer et réussir leurs examens de mathématiques et de sciences. Nous proposons actuellement les examens de l'<strong>USTHB pour L1 Informatique</strong>, avec l'ambition d'inclure toutes les universités et tous les modules. Ce n'est que le début !",
            hero_cta: "Commencer",
            hero_upload: "Contribuer et Télécharger votre Examen",
            subjects_title: "Matières Phares",
            subject_analyse1_title: "Analyse 1",
            subject_analyse1_desc: "Collection complète de <strong>17 examens</strong>. Limites, séries, et intégration.",
            subject_analyse2_title: "Analyse 2",
            subject_analyse2_desc: "Collection complète de <strong>17 examens</strong>. Limites, séries, et intégration.",
            subject_algebra_title: "Algèbre",
            subject_algebra_desc: "Bientôt Disponible",
            subject_algo_title: "Algorithmique et Structures de Données",
            subject_algo_desc: "Bientôt Disponible",
            footer_created_by: "Créé par BAGHDALI ABDELHADI",
            footer_copyright: "&copy; 2025 ExamsNexus. Tous droits réservés.",
            // For analysis pages
            analysis1_page_title: "Examens d'Analyse 1 - ExamsNexus",
            analysis2_page_title: "Examens d'Analyse 2 - ExamsNexus",
            analysis1_title: "Examens d'Analyse 1",
            analysis2_title: "Examens d'Analyse 2",
            select_exam_en: "Veuillez sélectionner un examen à voir (versions anglaises):",
            select_exam_fr: "Veuillez sélectionner un examen à voir (versions françaises):",
            // New "About" Page Translations
            about_page_title: "À Propos - ExamsNexus",
            about_title: "À Propos d'ExamsNexus",
            about_mission_title: "Notre Mission",
            about_mission_text: "Notre vision est d'être la première plateforme en Algérie pour l'archivage et la présentation des examens universitaires d'une manière moderne, engageante et non ennuyeuse. Nous voulons nous éloigner des fichiers statiques et créer une ressource interactive et utile pour tous les étudiants.",
            about_story_title: "Notre Histoire",
            about_story_text: "ExamsNexus a commencé avec une idée simple : faciliter la révision des examens. Nous proposons actuellement <strong>17 examens d'Analyse 1</strong> et <strong>17 examens d'Analyse 2</strong> de l'<strong>Université de l'USTHB (L1 Informatique)</strong>. Ce n'est que le début. Notre objectif est de nous étendre rapidement pour inclure plus de modules, plus d'universités et plus de ressources pour vous aider à réussir.",
            about_contribute_title: "Aidez-nous à grandir !",
            about_contribute_text: "Ce projet repose sur les contributions d'étudiants comme vous ! Si vous avez des examens universitaires (avec ou sans solutions), veuillez les télécharger. Nous ferons de notre mieux pour les convertir en pages web interactives dont tout le monde pourra bénéficier.",
            // New "How It Works" Section Translations
            how_it_works_title: "Comment ça Marche",
            step_1_title: "Trouvez Votre Module",
            step_1_desc: "Parcourez notre liste croissante de modules universitaires, en commençant par l'Analyse 1 et 2 de l'USTHB.",
            step_2_title: "Sélectionnez Votre Examen",
            step_2_desc: "Choisissez un examen dans la liste. Nous fournissons les versions française et anglaise, le cas échéant.",
            step_3_title: "Commencez à Pratiquer",
            step_3_desc: "Engagez-vous avec le contenu interactif pour tester vos connaissances et vous préparer pour votre session universitaire."
        }
    };

    const langSwitcherButton = document.getElementById('lang-switcher');
    const enContent = document.getElementById('content-en');
    const frContent = document.getElementById('content-fr');

    /**
     * Initializes the language based on stored preference or defaults to 'en'.
     */
    function initializeLanguage() {
        const storedLang = localStorage.getItem('language') || 'en';
        setLanguage(storedLang);
    }

    /**
     * Applies the selected language across the entire page.
     * @param {string} lang - The language code ('en' or 'fr').
     */
    function setLanguage(lang) {
        localStorage.setItem('language', lang);

        // 1. Update all data-lang elements
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                // Handle special cases for content that might contain HTML
                if (element.tagName === 'TITLE') {
                    element.textContent = translations[lang][key];
                } else if (key.includes('_desc') || key.includes('subtitle') || key.includes('text')) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // 2. Update the language switcher button text
        if (langSwitcherButton) {
            const newLangToggle = lang === 'en' ? 'fr' : 'en';
            const newLangText = newLangToggle.toUpperCase();
            
            langSwitcherButton.textContent = newLangText;
            langSwitcherButton.setAttribute('data-lang-toggle', newLangToggle);
        }
        
        // 3. Toggle content blocks (for analysis and about pages)
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
        const currentLang = localStorage.getItem('language') || 'en';
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        setLanguage(newLang);
    }

    // Initialize the language on load
    initializeLanguage();

    // Add click listener to the button
    if (langSwitcherButton) {
        langSwitcherButton.addEventListener('click', toggleLanguage);
    }

});