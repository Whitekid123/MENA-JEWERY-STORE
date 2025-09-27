// ===============================
// Header & Navigation Toggle
// ===============================
document.addEventListener('DOMContentLoaded', function(){
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];

  function setExpanded(val){
    if(!toggle) return;
    toggle.setAttribute('aria-expanded', String(val));
    header.classList.toggle('open', val);
  }

  if(toggle){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });
  }

  navLinks.forEach(link=>{
    link.addEventListener('click', () => setExpanded(false));
  });

  const scrolledClassThreshold = 20;
  window.addEventListener('scroll', () => {
    if(window.scrollY > scrolledClassThreshold) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Smooth scrolling for internal links (ignore WhatsApp/order buttons)
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    let href = anchor.getAttribute('href');
    if (href === "#") return; // skip fake links

    anchor.addEventListener('click', function(e){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});

// ===============================
// WhatsApp Order Buttons
// ===============================
const phone = "2349076521432"; // your WhatsApp number

document.querySelectorAll(".order-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    let product = btn.closest(".product");

    // Product details (fallbacks included)
    let name = product.getAttribute("data-name") 
               || product.querySelector("h3")?.innerText 
               || product.querySelector("img")?.alt 
               || "this product";

    let price = product.getAttribute("data-price") 
                || product.querySelector(".price")?.innerText 
                || "";

    let img = product.getAttribute("data-img") 
              || product.querySelector("img")?.src 
              || "";

    // Polished WhatsApp message
    let message = ` Order Request\n\n` +
                  `Product: ${name}\n` +
                  (price ? `Price: ${price}\n` : ``) +
                  (img ? `\n Image: ${img}\n` : ``) +
                  `\nPlease confirm availability.`;

    let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
});
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.querySelectorAll(".slides");
  slides.forEach(slide => slide.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000); // Change every 4 seconds
}
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Hero Slider Auto-play
let slides = document.querySelectorAll(".hero-slider .slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto change every 5s
setInterval(nextSlide, 5000);

