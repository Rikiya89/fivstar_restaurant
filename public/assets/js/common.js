const modal = document.querySelector('.js-modal'); // layer要素に付与したjs-modalクラスを取得し変数に格納
const modalButton = document.querySelector('.js-modal-button'); // button要素に付与したjs-modal-buttonクラスを取得し、変数に格納
const modalClose = document.querySelector('.js-close-button'); // xボタンのjs-close-buttonを取得し変数に格納

// モーダルボタンをクリックしたときのイベントを登録
if (modalButton) {
    modalButton.addEventListener('click', () => {
        if (modal) {
            modal.classList.add('is-open');
        }
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => { // xボタンをクリックしたときのイベントを登録
        if (modal) {
            modal.classList.remove('is-open');
        }
    });
}

function setupAccordion() {
    const accordions = document.querySelectorAll(".accordion-toggle");

    // Define the media query
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Function to apply correct settings based on the media query
    function handleMediaChange(e) {
        accordions.forEach(accordion => {
            const content = accordion.nextElementSibling;
            const icon = accordion.querySelector('.accordion-icon');

            if (e.matches) { // If the media query matches (small screen)
                // Ensure the content is not displayed by default
                content.style.display = "none";
                icon.classList.remove('open');

                // Add event listener
                accordion.addEventListener("click", handleAccordionClick);
            } else { // If the media query does not match (large screen)
                // Show content and reset icons
                content.style.display = "block";
                icon.classList.remove('open');

                // Remove event listener
                accordion.removeEventListener("click", handleAccordionClick);
            }
        });
    }

    // Attach listener to media query
    mediaQuery.addListener(handleMediaChange);

    // Call handler initially to set up accordions
    handleMediaChange(mediaQuery);
}

function handleAccordionClick() {
    const content = this.nextElementSibling;
    const icon = this.querySelector('.accordion-icon');

    // Toggle visibility and icon state
    if (content.style.display === "block") {
        content.style.display = "none";
        icon.classList.remove('open');
    } else {
        content.style.display = "block";
        icon.classList.add('open');
    }
}

// Setup accordions on page load
setupAccordion();