
/* =====================================
   募集・活動体験の切り替え設定
===================================== */

const recruitmentSettings = {
    trialOpen: false,       // 活動体験：true＝受付中 / false＝受付停止中
    memberRecruiting: false // メンバー募集：true＝募集中 / false＝募集停止中
};


/* =====================================
   募集表示の更新
===================================== */

function updateRecruitmentDisplay() {

    const trialOpen = document.getElementById("trialOpen");
    const trialClosed = document.getElementById("trialClosed");

    const memberOpen = document.getElementById("memberOpen");
    const memberClosed = document.getElementById("memberClosed");

    // 活動体験
    if (trialOpen && trialClosed) {
        trialOpen.style.display = recruitmentSettings.trialOpen ? "block" : "none";
        trialClosed.style.display = recruitmentSettings.trialOpen ? "none" : "block";
    }

    // メンバー募集
    if (memberOpen && memberClosed) {
        memberOpen.style.display = recruitmentSettings.memberRecruiting ? "block" : "none";
        memberClosed.style.display = recruitmentSettings.memberRecruiting ? "none" : "block";
    }
}


/* =====================================
   スマートフォンメニュー
===================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function closeMenu() {
    if (!menuToggle || !nav) return;

    nav.classList.remove("active");
    menuToggle.classList.remove("active");
}

if (menuToggle && nav) {

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });
}


/* =====================================
   ページ内スクロール
===================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            closeMenu();
        }
    });

});


/* =====================================
   ページトップへ戻るボタン
===================================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =====================================
   フッターの年号
===================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =====================================
   初期表示
===================================== */

document.addEventListener("DOMContentLoaded", function () {
    updateRecruitmentDisplay();
});
