// モーダル機能を管理するクラス
class Modal {
    constructor() {
        this.modal = document.querySelector('.js-modal'); // モーダル要素を取得
        this.modalButton = document.querySelector('.js-modal-button'); // モーダルボタン要素を取得
        this.modalClose = document.querySelector('.js-close-button'); // モーダルのクローズボタンを取得
        this.modalBg = document.querySelector('.p-modal-bg'); // モーダル背景を取得

        this.initEvents(); // イベントを初期化
    }

    initEvents() {
        // モーダルボタンをクリックしたときにモーダルを開く
        if (this.modalButton) {
            this.modalButton.addEventListener('click', () => this.openModal());
        }
        // クローズボタンをクリックしたときにモーダルを閉じる
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        // モーダルの背景部分をクリックしたときにモーダルを閉じる
        if (this.modalBg) {
            this.modalBg.addEventListener('click', () => this.closeModal());
        }
    }

    // モーダルを開くメソッド
    openModal() {
        if (this.modal) {
            this.modal.classList.add('is-open');
        }
    }

    // モーダルを閉じるメソッド
    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('is-open');
        }
    }
}

// アコーディオン機能を管理するクラス
class Accordion {
    constructor() {
        this.accordions = document.querySelectorAll(".accordion-toggle"); // アコーディオンのトグル要素を取得
        this.mediaQuery = window.matchMedia("(max-width: 768px)"); // メディアクエリを設定
        this.initAccordion(); // アコーディオンを初期化
    }

    initAccordion() {
        // メディアクエリが変更されたときに handleMediaChange メソッドを呼び出す
        this.mediaQuery.addListener(e => this.handleMediaChange(e));
        this.handleMediaChange(this.mediaQuery); // 初期設定でアコーディオンを設定
    }

    // メディアクエリに基づいてアコーディオンの設定を変更するメソッド
    handleMediaChange(e) {
        this.accordions.forEach(accordion => {
            const content = accordion.nextElementSibling; // アコーディオンのコンテンツ要素を取得
            const icon = accordion.querySelector('.accordion-icon'); // アイコン要素を取得

            if (e.matches) { // メディアクエリが一致する場合（スマートフォンサイズ）
                content.style.display = "none"; // コンテンツを非表示に設定
                icon.classList.remove('open'); // アイコンを閉じる状態に設定
                accordion.addEventListener("click", this.handleAccordionClick.bind(this)); // アコーディオンのクリックイベントを登録
            } else { // メディアクエリが一致しない場合（PCサイズ）
                content.style.display = "block"; // コンテンツを表示
                icon.classList.remove('open'); // アイコンを閉じる状態に設定
                accordion.removeEventListener("click", this.handleAccordionClick.bind(this)); // クリックイベントを解除
            }
        });
    }

    // アコーディオンをクリックしたときのイベントハンドラ
    handleAccordionClick(event) {
        const content = event.currentTarget.nextElementSibling; // コンテンツ要素を取得
        const icon = event.currentTarget.querySelector('.accordion-icon'); // アイコン要素を取得

        // コンテンツ表示の切り替え
        if (content.style.display === "block") {
            content.style.display = "none";
            icon.classList.remove('open'); // アイコンを閉じる
        } else {
            content.style.display = "block";
            icon.classList.add('open'); // アイコンを開く
        }
    }
}

// Swiperのインスタンスを管理するクラス
class SwiperSixthInstance {
    constructor() {
        this.SwiperSixths = document.querySelectorAll(".SwiperSixth"); // Swiper要素を取得
        this.initSwiper(); // Swiperを初期化
        window.addEventListener('resize', () => this.initSwiper()); // ウィンドウサイズ変更時にSwiperを再設定
    }

    initSwiper() {
        this.SwiperSixths.forEach(SwiperSixths => {
            // 既存のSwiperインスタンスを破棄
            if (this.swiper) {
                this.swiper.destroy(true, true);
            }

            const slideCount = SwiperSixths.querySelectorAll('.swiper-slide').length; // スライドの数を取得

            this.container = SwiperSixths.closest(".swiper-container"); // Swiperのコンテナを取得
            if (window.innerWidth >= 768 && slideCount > 4) { // PCサイズでスライド数が多い場合
                this.swiper = new Swiper(SwiperSixths, {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                        hide: false,
                    },
                });
            } else if (window.innerWidth < 768) { // モバイルサイズの場合
                this.swiper = new Swiper(SwiperSixths, {
                    slidesPerView: 1.4,
                    spaceBetween: 10,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true,
                        hide: false,
                    },
                });
            }
        });
    }
}

// 各クラスのインスタンスを生成
const modal = new Modal();
const accordion = new Accordion();
const swiperSixthInstance = new SwiperSixthInstance();