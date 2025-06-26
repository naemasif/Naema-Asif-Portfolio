// script.js

// Smooth scroll for internal links
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Basic contact form validation with toast notification and EmailJS
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = form.querySelectorAll('input, textarea');
  let valid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      valid = false;
      input.style.border = '2px solid red';
    } else {
      input.style.border = '1px solid #ccc';
    }
  });
  if (valid) {
    // Use EmailJS to send email
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      from_name: inputs[0].value,
      from_email: inputs[1].value,
      message: inputs[2].value
    }, "YOUR_USER_ID")
    .then(() => {
      showToast("Thank you for your message! Naema will get back to you soon.");
      form.reset();
    }, (error) => {
      showToast("Oops! Something went wrong.");
      console.error(error);
    });
  }
});

// Toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = '#0077cc';
  toast.style.color = '#fff';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '4px';
  toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
