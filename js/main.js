
/* ========================================
   Buddy's Jazz Chori
   Main JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    /* ========================================
       募集関連の設定
       true  = ON（表示・受付する）
       false = OFF（非表示・受付しない）
    ======================================== */

    const recruitmentSettings = {
        trialOpen: false,              // 活動体験の受付
        memberRecruiting: false,       // メンバー募集
        guidelinesVisible: false,     // 募集要項の表示
        applicationFormVisible: false // 応募フォームの表示
    };

    /*
     * FormspreeのフォームURLを設定
     *
     * 例：
     * "https://formspree.io/f/xxxxxxxx"
     *
     * 送信先メールアドレスはFormspree側で設定します。
     */
    const formspreeEndpoint = "";

    /* ---------- Recruitment Display ---------- */

    function updateRecruitmentDisplay() {
        const trialOpen = document.getElementById("trialOpen");
        const trialClosed = document.getElementById("trialClosed");
        const memberOpen = document.getElementById("memberOpen");
        const memberClosed = document.getElementById("memberClosed");

        const guidelines = document.getElementById("recruitmentGuidelines");

        const applicationArea = document.getElementById("applicationArea");
        const applicationUnavailable = document.getElementById("applicationUnavailable");

        // 活動体験
        if (trialOpen && trialClosed) {
            trialOpen.hidden = !recruitmentSettings.trialOpen;
            trialClosed.hidden = recruitmentSettings.trialOpen;
        }

        // メンバー募集
        if (memberOpen && memberClosed) {
            memberOpen.hidden = !recruitmentSettings.memberRecruiting;
            memberClosed.hidden = recruitmentSettings.memberRecruiting;
        }

        // 募集要項
        if (guidelines) {
            guidelines.hidden = !recruitmentSettings.guidelinesVisible;
        }

        // 応募できる募集があるか
        const isRecruiting =
            recruitmentSettings.trialOpen ||
            recruitmentSettings.memberRecruiting;

        // 応募フォーム全体の表示設定
        if (applicationArea) {
            applicationArea.hidden =
                !recruitmentSettings.applicationFormVisible || !isRecruiting;
        }

        // 受付停止中の案内
        if (applicationUnavailable) {
            applicationUnavailable.hidden =
                !recruitmentSettings.applicationFormVisible || isRecruiting;
        }

        updateApplicationOptions();
    }

    /* ---------- Application Options ---------- */

    function updateApplicationOptions() {
        const applicationType = document.getElementById("applicationType");

        if (!applicationType) return;

        const trialOption = applicationType.querySelector(
            'option[value="活動体験の申し込み"]'
        );

        const memberOption = applicationType.querySelector(
            'option[value="メンバー募集について"]'
        );

        if (trialOption) {
            trialOption.disabled = !recruitmentSettings.trialOpen;
        }

        if (memberOption) {
            memberOption.disabled = !recruitmentSettings.memberRecruiting;
        }
    }

    updateRecruitmentDisplay();


    /* ========================================
       Application Form
    ======================================== */

    const applicationForm = document.getElementById("applicationForm");
    const formStatus = document.getElementById("formStatus");
    const formSubmit = applicationForm
        ? applicationForm.querySelector('button[type="submit"]')
        : null;

    if (applicationForm) {

        // Formspreeの送信先を設定
        if (formspreeEndpoint.trim() !== "") {
            applicationForm.action = formspreeEndpoint;
        }

        applicationForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const isRecruiting =
                recruitmentSettings.trialOpen ||
                recruitmentSettings.memberRecruiting;

            // フォームの表示設定確認
            if (!recruitmentSettings.applicationFormVisible) {
                if (formStatus) {
                    formStatus.textContent =
                        "現在、応募フォームは利用できません。";
                }
                return;
            }

            // 募集状況確認
            if (!isRecruiting) {
                if (formStatus) {
                    formStatus.textContent =
                        "現在、応募受付を休止しています。";
                }
                return;
            }

            // 送信先未設定
            if (formspreeEndpoint.trim() === "") {
                if (formStatus) {
                    formStatus.textContent =
                        "メール送信の設定が完了していません。お電話にてお問い合わせください。";
                }
                return;
            }

            // 送信中表示
            if (formSubmit) {
                formSubmit.disabled = true;
                formSubmit.textContent = "送信しています...";
            }

            if (formStatus) {
                formStatus.textContent = "";
            }

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: "POST",
                    body: new FormData(applicationForm),
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("送信に失敗しました。");
                }

                applicationForm.reset();

                if (formStatus) {
                    formStatus.textContent =
                        "お問い合わせを送信しました。ありがとうございます。";
                }

            } catch (error) {
                if (formStatus) {
                    formStatus.textContent =
                        "送信できませんでした。時間をおいて再度お試しください。";
                }

            } finally {
                if (formSubmit) {
                    formSubmit.disabled = false;
                    formSubmit.textContent = "送信内容を確認して送信";
                }
            }
        });
    }


    /* ========================================
       Mobile Navigation
    ======================================== */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    function openMenu() {
        if (!menuToggle || !nav) return;

        nav.classList.add("active");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "メニューを閉じる");
        body.classList.add("menu-open");
    }

    function closeMenu() {
        if (!menuToggle || !nav) return;

        nav.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
        body.classList.remove("menu-open");
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenu = nav.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 780) {
                closeMenu();
            }
        });
    }


    /* ========================================
       Smooth Scroll
    ======================================== */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.getElementById(href.slice(1));

            if (!target) return;

            event.preventDefault();

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });

            closeMenu();
        });
    });


    /* ========================================
       Header Scroll Effect
    ======================================== */

    const header = document.querySelector(".header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* ========================================
       Back To Top
    ======================================== */

    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {
        if (!backToTop) return;

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    if (backToTop) {
        updateBackToTop();

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        backToTop.addEventListener("click", () => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    }


    /* ========================================
       Current Year
    ======================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});
