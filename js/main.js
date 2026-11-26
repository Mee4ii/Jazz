
/* ========================================
   Buddy's Jazz Chori
   Main JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    /* ---------- Recruitment Settings ---------- */

    // true : 受付中・募集中
    // false: 受付休止中・募集休止中
    const recruitmentSettings = {
        trialOpen: false,
        memberRecruiting: false
    };

    function updateRecruitmentDisplay() {
        const trialOpen = document.getElementById("trialOpen");
        const trialClosed = document.getElementById("trialClosed");
        const memberOpen = document.getElementById("memberOpen");
        const memberClosed = document.getElementById("memberClosed");

        if (trialOpen && trialClosed) {
            trialOpen.hidden = !recruitmentSettings.trialOpen;
            trialClosed.hidden = recruitmentSettings.trialOpen;
        }

        if (memberOpen && memberClosed) {
            memberOpen.hidden = !recruitmentSettings.memberRecruiting;
            memberClosed.hidden = recruitmentSettings.memberRecruiting;
        }
    }

    updateRecruitmentDisplay();


    /* ---------- Mobile Navigation ---------- */

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
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

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


    /* ---------- Smooth Scroll ---------- */

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


    /* ---------- Header Scroll Effect ---------- */

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


    /* ---------- Back To Top ---------- */

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


    /* ---------- Current Year ---------- */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
