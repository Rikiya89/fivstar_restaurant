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

function activateAccordion() {
    const accordions = document.querySelectorAll(".accordion-toggle");
    const isSmallScreen = window.innerWidth <= 768;

    accordions.forEach(function(accordion) {
        const content = accordion.nextElementSibling;
        const icon = accordion.querySelector('.accordion-icon');

        if (isSmallScreen) {
            accordion.addEventListener("click", function() {
                // Toggle the content
                if (content.style.display === "block") {
                    content.style.display = "none";
                    icon.classList.remove('open');
                } else {
                    content.style.display = "block";
                    icon.classList.add('open');
                }
            });
        } else {
            content.style.display = "block"; // Ensure content is displayed on larger screens
            icon.classList.remove('open'); // Reset icon on larger screens
            accordion.removeEventListener("click", function() {});
        }
    });
}

// Run on initial load
activateAccordion();

// Run on resize
window.addEventListener('resize', activateAccordion);