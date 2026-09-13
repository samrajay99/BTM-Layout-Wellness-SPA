/**
 * CONFIGURATION: Put your official reception contact numbers below
 */
const SPA_CONFIG = {
  phone: "+918097369137", // Put your verified desk phone number
  whatsappPhone: "918097369137" // Put your WhatsApp business number (without +)
};

// Update floating call href dynamically
document.getElementById('floatingCallBtn').href = `tel:${SPA_CONFIG.phone}`;

// IntersectionObserver for modern scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
  
  // Use the visitor's local date for the booking minimum and default.
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  const datePicker = document.getElementById('custDate');
  if (datePicker) {
    datePicker.min = today;
    datePicker.value = today;
  }
});

// Lightbox modal functionality
function openLightbox(el) {
  const img = el.querySelector('img');
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  
  if (img && lightbox && lightboxImg) {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  document.getElementById('imageLightbox').classList.remove('active');
}

// WhatsApp Appointment Booking Logic
function openBookingModal(defaultService = '') {
  const modal = document.getElementById('bookingModal');
  const serviceSelect = document.getElementById('custService');
  
  if (serviceSelect && defaultService && defaultService !== 'General Appointment' && defaultService !== 'Direct WhatsApp Query') {
    serviceSelect.value = defaultService;
  }
  modal.classList.add('active');
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('active');
}

function closeBookingModalOnBackdrop(event) {
  if (event.target.id === 'bookingModal') closeBookingModal();
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBookingModal();
    closeLightbox();
  }
});

function handleBookingSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('custName').value.trim();
  const service = document.getElementById('custService').value;
  const date = document.getElementById('custDate').value;
  const time = document.getElementById('custTime').value;

  const message = [
    'Hello BTM Layout Wellness Day & Night Spa,',
    '',
    'I would like to schedule an appointment:',
    `Client Name: ${name}`,
    `Therapy: ${service}`,
    `Preferred Date: ${date}`,
    `Time Slot: ${time}`,
    '',
    'Please confirm slot availability. Thank you!'
  ].join('\n');

  window.open(`https://wa.me/${SPA_CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`, '_blank');
  closeBookingModal();
}

function buildWhatsAppLink(message) {
  return `https://wa.me/${SPA_CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

const directWhatsAppMessage = 'Hello BTM Layout Wellness Day & Night Spa, I would like to know more about your services and available slots.';
document.getElementById('locationWhatsappBtn').href = buildWhatsAppLink(directWhatsAppMessage);
document.getElementById('floatingWhatsappBtn').href = buildWhatsAppLink(directWhatsAppMessage);

// Header scroll background effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(12, 14, 17, 0.98)';
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
  } else {
    header.style.background = 'rgba(18, 20, 23, 0.92)';
    header.style.boxShadow = 'none';
  }
});

function toggleMobileNav() {
  const menu = document.querySelector('.nav-menu');
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.position = 'absolute';
    menu.style.top = '100%';
    menu.style.left = '0';
    menu.style.right = '0';
    menu.style.background = '#121417';
    menu.style.padding = '1.5rem';
    menu.style.borderBottom = '1px solid var(--border)';
  }
}
