document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ORIGINAL SCRIPT (Scroll Animations & Navbar) ---
// ... existing code ...
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

// ... existing code ...
    // --- 2. ADDED SCRIPT (Language Switching) ---

    // Define all translations
    const translations = {
        en: {
            home_title: "ExamsNexus - Master Your University Exams",
            logo: "ExamsNexus",
            nav_home: "Home",
// ... existing code ...
            subject_algo_title: "Algorithms and Data Structures",
            subject_algo_desc: "Coming Soon",
            footer_created_by: "Created by BAGHDALI ABDELHADI",
            footer_copyright: "&copy; 2025 ExamsNexus. All rights reserved.",
            // For analysis pages (when you create them)
            analysis1_page_title: "Analysis 1 Exams - ExamsNexus",
            analysis2_page_title: "Analysis 2 Exams - ExamsNexus",
            analysis1_title: "Analysis 1 Exams",
// ... existing code ...
            select_exam_fr: "Please select an exam to view (French versions):"
        },
        fr: {
            home_title: "ExamsNexus - Maîtrisez vos examens universitaires",
            logo: "ExamsNexus",
            nav_home: "Accueil",
// ... existing code ...
            subject_algo_title: "Algorithmes et Structures de Données",
            subject_algo_desc: "Bientôt disponible",
            footer_created_by: "Créé par BAGHDALI ABDELHADI",
            footer_copyright: "&copy; 2025 ExamsNexus. Tous droits réservés.",
            // For analysis pages (when you create them)
            analysis1_page_title: "Examens Analyse 1 - ExamsNexus",
            analysis2_page_title: "Examens Analyse 2 - ExamsNexus",
            analysis1_title: "Examens d'Analyse 1",
// ... existing code ...
            select_exam_fr: "Veuillez sélectionner un examen à consulter (versions françaises):"
        }
    };

    // Get language switcher elements
// ... existing code ...
    const enContent = document.getElementById('lang-en-content');
    const frContent = document.getElementById('lang-fr-content');

// ... existing code ...
    let currentLang = localStorage.getItem('dzmath_lang') || 'en';

    /**
// ... existing code ...
     * @param {string} lang - 'en' or 'fr'
     */
    function setLanguage(lang) {
// ... existing code ...
        if (lang !== 'en' && lang !== 'fr') {
            lang = 'en'; // Default
        }
// ... existing code ...
        currentLang = lang;
        localStorage.setItem('dzmath_lang', lang);
        document.documentElement.lang = lang; // Set HTML lang attribute

// ... existing code ...
        // 1. Translate all static text
        translatableElements.forEach(element => {
// ... existing code ...
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
// ... existing code ...
                if (element.tagName === 'TITLE') {
                    element.textContent = translations[lang][key];
// ... existing code ...
                } else {
                    element.innerHTML = translations[lang][key];
                }
// ... existing code ...
            }
        });

// ... existing code ...
        // 2. Toggle content blocks (for analysis pages)
        if (enContent && frContent) {
// ... existing code ...
            if (lang === 'fr') {
                enContent.classList.add('hidden');
// ... existing code ...
                frContent.classList.remove('hidden');
            } else {
// ... existing code ...
                enContent.classList.remove('hidden');
                frContent.classList.add('hidden');
            }
// ... existing code ...
        }
    }

    /**
// ... existing code ...
     * Toggles the language between 'en' and 'fr'
     */
    function toggleLanguage() {
// ... existing code ...
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        setLanguage(newLang);
    }
// ... existing code ...
    // Add click listener to the button
    if (langSwitcherButton) {
// ... existing code ...
        langSwitcherButton.addEventListener('click', toggleLanguage);
    }

    // Apply language on initial page load
    setLanguage(currentLang);

});