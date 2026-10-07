// Dark Mode
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️";
        localStorage.setItem("darkMode", "enabled");
    } else {
        darkModeBtn.textContent = "🌙";
        localStorage.setItem("darkMode", "disabled");
    }

});


// Check Dark Mode
if (localStorage.getItem("darkMode") === "enabled") {

    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️";

}


// Contact Form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");


    // Check Empty Fields
    if (name === "" || email === "" || message === "") {

        formMessage.textContent = "Please fill in all fields.";
        return;

    }


    // Check Email
    if (!email.includes("@")) {

        formMessage.textContent = "Please enter a valid email.";
        return;

    }


    // Email Subject
    const subject = "New Message From Portfolio";


    // Email Body
    const body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message;


    // Open Email App
    window.location.href =
        "mailto:mbarakat16706@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);


    // Show Message
    formMessage.textContent =
        "Your email app will open to send the message.";


    // Clear Form
    contactForm.reset();

});


// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("show");

});


// Close Mobile Menu
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("show");

    });

});


// Back To Top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});


topBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});