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

class FadeInAnimation {
    constructor() {
        // ボタンと画像の要素を取得
        this.lunchButton = document.querySelector('.btn-top .lunch');
        this.morningButton = document.querySelector('.btn-bottom-inner .morning');
        this.dinnerButton = document.querySelector('.btn-bottom-inner .dinner');

        this.lunchImage = document.getElementById('lunch');
        this.morningImage = document.getElementById('morning');
        this.dinnerImage = document.getElementById('dinner');
        this.kvContainer = document.querySelector('.kv-container');

        this.initEvents(); // イベントを初期化
    }

    // 全てのアクティブなクラスをリセットする関数
    resetActiveClasses() {
        this.lunchButton?.classList.remove('active');
        this.morningButton?.classList.remove('active');
        this.dinnerButton?.classList.remove('active');

        this.lunchImage.classList.remove('active');
        this.morningImage.classList.remove('active');
        this.dinnerImage.classList.remove('active');

        this.kvContainer.classList.remove('morning-active', 'lunch-active', 'dinner-active');
    }

    // 特定のセクションをアクティブにする関数
    activateSection(button, image, timeOfDay) {
        this.resetActiveClasses(); // リセット関数を呼び出し
        button?.classList.add('active'); // ボタンにアクティブクラスを追加
        image.classList.add('active'); // 画像にアクティブクラスを追加
        this.kvContainer.classList.add(`${timeOfDay}-active`); // コンテナに特定のクラスを追加
    }

    // イベントを初期化する関数
    initEvents() {
        // ランチボタンのクリックイベントを設定
        this.lunchButton?.addEventListener('click', (event) => {
            event.preventDefault(); // デフォルト動作を無効化
            this.activateSection(this.lunchButton, this.lunchImage, 'lunch'); // ランチセクションをアクティブに
        });

        // モーニングボタンのクリックイベントを設定
        this.morningButton?.addEventListener('click', (event) => {
            event.preventDefault();
            this.activateSection(this.morningButton, this.morningImage, 'morning'); // モーニングセクションをアクティブに
        });

        // ディナーボタンのクリックイベントを設定
        this.dinnerButton?.addEventListener('click', (event) => {
            event.preventDefault();
            this.activateSection(this.dinnerButton, this.dinnerImage, 'dinner'); // ディナーセクションをアクティブに
        });
    }
}

// 各クラスのインスタンスを生成
const modal = new Modal();
const accordion = new Accordion();
const fadeinanimation = new FadeInAnimation();
