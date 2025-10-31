document.addEventListener('DOMContentLoaded', () => {
    // Get the container where the exam will be loaded
    const contentContainer = document.getElementById('exam-content-container');
    const loader = document.getElementById('exam-content-loader');

    // 1. Get the 'src' parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const examSrc = params.get('src');

    if (examSrc) {
        // 2. Fetch the exam content from the path
        fetch(examSrc)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (404 Not Found) for: ${examSrc}`);
                }
                return response.text(); // Get the HTML content as text
            })
            .then(html => {
                // --- THIS IS THE NEW FIX ---

                // 3. Parse the fetched text into a new, temporary HTML document
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // 4. Get the content from BOTH head and body.
                // This handles malformed files where content is in the <head>.
                const headContent = doc.head ? doc.head.innerHTML : '';
                const bodyContent = doc.body ? doc.body.innerHTML : '';
                const fullContent = headContent + bodyContent;

                // 5. Inject the combined HTML content
                contentContainer.innerHTML = fullContent;
                
                // 6. NOW, find all images *that were just injected*
                const images = contentContainer.querySelectorAll('img');
                
                // 7. Create the absolute URL to the *source* file (e.g., .../analysis1/English/1.html)
                // This is the base URL we need to fix relative image paths
                const sourceFileAbsoluteUrl = new URL(examSrc, window.location.href);
                
                images.forEach(img => {
                    const oldSrc = img.getAttribute('src');
                    if (oldSrc && !oldSrc.startsWith('http') && !oldSrc.startsWith('/')) {
                        // It's a relative path. Resolve it against the *source file's* location.
                        // e.g., new URL('../1.jpeg', '.../dzmath-exams/analysis1/English/1.html') 
                        // resolves to: '.../dzmath-exams/analysis1/1.jpeg'
                        const newAbsoluteSrc = new URL(oldSrc, sourceFileAbsoluteUrl.href);
                        img.src = newAbsoluteSrc.href;

                        // Add a simple error handler in case the image *still* 404s
                        img.onerror = () => {
                            img.alt = `Error: Image could not be loaded from ${newAbsoluteSrc.pathname}`;
                            img.style.color = '#f87171';
                            img.style.border = '2px dashed #f87171';
                            img.style.padding = '1rem';
                        };
                    }
                });
                // --- END OF NEW FIX ---

                // Set the page title based on the URL
                try {
                    const parts = examSrc.split('/'); // ['analysis1', 'English',1.html']
                    const subject = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
                    const examNum = parts[2].split('.')[0];
                    document.title = `${subject} - Exam ${examNum} | DZMATH-EXAMS`;
                } catch (e) {
                    // Fallback title
                    document.title = "Exam | DZMATH-EXAMS";
                }

                // Hide loader, show content
                loader.style.display = 'none';
                contentContainer.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching exam:', error);
                loader.style.display = 'none';
                // Show a more helpful error
                contentContainer.innerHTML = `<p class="exam-error">Error: Could not load the exam file at "<b>${examSrc}</b>". Please check the file path and try again.</p>`;
                contentContainer.style.display = 'block';
            });
    } else {
        // If no 'src' is provided
        loader.style.display = 'none';
        contentContainer.innerHTML = `<p class="exam-error">Error: No exam source specified. Please select an exam from one of the subject pages.</p>`;
        contentContainer.style.display = 'block';
    }
});