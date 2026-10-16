
// Dark Mode
const darkModeBtn = document.getElementById("darkModeBtn");

function updateDarkMode(enabled) {
    document.body.classList.toggle("dark-mode", enabled);
    darkModeBtn.textContent = enabled ? "☀️" : "🌙";
    darkModeBtn.setAttribute("aria-pressed", enabled);

    localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
}

darkModeBtn.addEventListener("click", function () {
    const isDarkMode = document.body.classList.contains("dark-mode");
    updateDarkMode(!isDarkMode);
});

if (localStorage.getItem("darkMode") === "enabled") {
    updateDarkMode(true);
}


// Get Elements
const languageBtn = document.getElementById("languageBtn");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
const topBtn = document.getElementById("topBtn");


// Language Switch
function updateLanguage(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // Update Text Without Removing Icons
    document.querySelectorAll("[data-en][data-ar]").forEach(function (element) {
        const text = element.getAttribute("data-" + language);

        if (text === null) return;

        if (element.children.length === 0) {
            element.textContent = text;
            return;
        }

        const textNode = Array.from(element.childNodes).find(function (node) {
            return node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim() !== "";
        });

        if (textNode) {
            textNode.textContent = text;
        }
    });

    // Update Input Placeholders
    document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]")
        .forEach(function (element) {
            const placeholder = element.getAttribute(
                "data-placeholder-" + language
            );

            if (placeholder !== null) {
                element.placeholder = placeholder;
            }
        });

    // Update Language Button
    languageBtn.textContent = language === "en" ? "عربي" : "English";

    languageBtn.setAttribute(
        "aria-label",
        language === "en" ? "Switch to Arabic" : "Switch to English"
    );

    // Update Navigation Labels
    menuBtn.setAttribute(
        "aria-label",
        language === "ar" ? "فتح قائمة التنقل" : "Open navigation menu"
    );

    document.querySelector(".navbar").setAttribute(
        "aria-label",
        language === "ar" ? "القائمة الرئيسية" : "Main navigation"
    );

    // Update Back To Top Label
    const label = topBtn.getAttribute("data-label-" + language);

    if (label) {
        topBtn.setAttribute("aria-label", label);
    }

    // Update Page Title
    document.title = language === "ar"
        ? "محمد بركات | مطور Full-Stack"
        : "Mohamed Barakat | Full-Stack Developer";

    // Save Language
    localStorage.setItem("language", language);

    // Clear Form Message
    formMessage.textContent = "";
}


// Language Button
languageBtn.addEventListener("click", function () {
    const currentLanguage = document.documentElement.lang;
    updateLanguage(currentLanguage === "en" ? "ar" : "en");
});

// Load Saved Language
const savedLanguage = localStorage.getItem("language") || "en";
updateLanguage(savedLanguage);


// Contact Form
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const language = document.documentElement.lang;

    // Check Empty Fields
    if (name === "" || email === "" || message === "") {
        formMessage.textContent = language === "ar"
            ? "من فضلك املأ جميع الحقول."
            : "Please fill in all fields.";
        return;
    }

    // Check Email
    
 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formMessage.textContent = language === "ar"
            ? "من فضلك أدخل بريدًا إلكترونيًا صحيحًا."
            : "Please enter a valid email.";
        return;
    }

    // Email Details
    const subject = language === "ar"
        ? "رسالة جديدة من الموقع الشخصي"
        : "New Message From Portfolio";

    const body = language === "ar"
    ? `الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\nالرسالة:\n${message}`
    : `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    // Open Email App
    const mailtoLink =
        "mailto:mbarakat16706@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    formMessage.textContent = language === "ar"
        ? "تم تجهيز الرسالة. أكمل إرسالها من تطبيق البريد الإلكتروني."
        : "Your message is ready. Complete sending it from your email app.";

    window.location.href = mailtoLink;

    contactForm.reset();
});


// Mobile Menu
menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", isOpen);
});

// Close Mobile Menu
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});


// Back To Top
window.addEventListener("scroll", function () {
    topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

topBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const revealItems = document.querySelectorAll(
    ".skills-container .skill, " +
    ".goals-container .goal, " +
    ".projects-container .project-card"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealItems.forEach((item) => {
    revealObserver.observe(item);
});
